import { registerDecorator, ValidationOptions } from 'class-validator';

function AllowNull(isAllow: boolean, validationOptions?: ValidationOptions) {
  return function(object: Object, propertyName: string) {
    registerDecorator({
      name: 'isLongerThan',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          return (isAllow ? true : value !== null);
        },
        defaultMessage() {
          return `${propertyName} cannot be null`;
        },
      },
    });
  };
}

export { AllowNull };