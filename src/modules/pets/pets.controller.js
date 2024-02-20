import { catchAsync } from "../../common/errors/catchAsync.js";
import { uploadFile } from "../../common/utils/upload-files-cloud.js";
import { generateUUID } from "../../config/plugins/generate-uuid.js";
import { httpClient } from "../../config/plugins/http-client.js";
import { validatePartialPet, validatePet } from "./pets.schema.js";
import { PetService } from "./pets.service.js";

export const createPet = catchAsync(async (req, res, next) => {
    const dataBody = {
        name: req.body.name,
        birthdate: req.body.birthdate,
        specie: req.body.specie,
        race: req.body.race,
        userId: +req.body.userId,
    };

    const { hasError, errorMessages, petData } = validatePet(dataBody);

    if (hasError)
        return res
            .status(422)
            .json({ status: "error", message: errorMessages });

    const path = `pet/${generateUUID()}-${req.file.originalName}`;

    const photoUrl = await uploadFile.uploadToFireBase(path, req.file.buffer);

    const medicalCardNumber = generateUUID();

    const result = await httpClient.get(
        `http://localhost:3100/api/v1/genetic-diseases?specie=${petData.specie}`
    );

    const diseases = result.geneticDiseases.map((disease) => disease.name);

    petData.medicalCardNumber = medicalCardNumber;
    petData.geneticDiseases = diseases;
    petData.photoUrl = photoUrl;

    const pet = await PetService.createPet(petData);

    return res.status(201).json(pet);
});

export const findAllPets = catchAsync(async (req, res, next) => {
    const allPets = await PetService.findAllPets();

    return res.status(200).json(allPets);
});

export const findOnePet = catchAsync(async (req, res, next) => {
    const { pet } = req;

    return res.status(200).json(pet);
});

export const updatePet = catchAsync(async (req, res, next) => {
    const { pet } = req;

    const { hasError, errorMessages, petData } = validatePartialPet(req.body);

    if (hasError)
        return res
            .status(422)
            .json({ status: "error", message: errorMessages });

    const updatedPet = await PetService.updatePet(pet, petData);

    return res.status(201).json({
        message: "the pet has been updated successfully!",
    });
});

export const deletePet = catchAsync(async (req, res, next) => {
    const { pet } = req;

    await PetService.deletePet(pet);

    return res.status(204).json(null);
});
