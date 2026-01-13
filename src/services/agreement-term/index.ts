import { get } from './get'
import { isSignedTerms } from './is-signed-terms'
import { sign } from './sign'
import { userTerms } from './user-terms'

export const agreementTermService = {
  isSignedTerms,
  get,
  sign,
  userTerms,
}
