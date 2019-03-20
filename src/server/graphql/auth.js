export const mustBeLogged = resolver => (object, variables, context) => {
  if (!context.user) {
    throw new Error('Unauthorized')
  }

  return resolver(object, variables, context)
}
