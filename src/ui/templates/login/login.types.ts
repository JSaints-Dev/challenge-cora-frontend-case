import { validations } from "./login.validations";
import { z } from "zod";

export type LoginFormValues = z.infer<typeof validations.loginSchema>;
