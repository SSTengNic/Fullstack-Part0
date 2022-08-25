"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patientService_1 = __importDefault(require("../services/patientService"));
const patientEntryValidation_1 = __importDefault(require("../utils/patientEntryValidation"));
const router = express_1.default.Router();
router.get('/', (_, res) => {
    res.send(patientService_1.default.excludePatientSsn());
});
router.post('/', (req, res) => {
    try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        const newPatientEntry = (0, patientEntryValidation_1.default)(req.body);
        const addedEntry = patientService_1.default.addPatient(newPatientEntry);
        res.json(addedEntry);
    }
    catch (error) {
        let errorMessage = 'Something went wrong.';
        if (error instanceof Error) {
            errorMessage += ' Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    }
});
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
/*
const newPatientEntry = patientService.addPatient(
   name,
   dateOfBirth,
   ssn,
   gender,
   occupation
)
 */
exports.default = router;
