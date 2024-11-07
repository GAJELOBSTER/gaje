import { authError } from "./authError";
import { customError } from "./customError";
import { serverError } from "./serverError";

const errors = {
  ...authError,
  ...customError,
  ...serverError,
};
export default errors;
