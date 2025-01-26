import * as yup from 'yup';

import { createEmployeeValidationSchema } from './CreateEmployeeValidation';

export type NovoFuncionarioForm = yup.InferType<
  typeof createEmployeeValidationSchema
>;
