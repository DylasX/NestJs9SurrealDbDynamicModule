import { Logger } from "@nestjs/common";

export const formatMetadataKey = Symbol('Properties');

/**
 * Properties
 * @param props
 */
export const Properties = (props?: {
  fieldName?: string;
  returnField?: boolean;
  // eslint-disable-next-line @typescript-eslint/ban-types
  map?: Object[];
  // eslint-disable-next-line @typescript-eslint/ban-types
  transform?: Function;
}) => {
  return Reflect.metadata(formatMetadataKey, props);
};

/**
 * getProperties
 * @param target
 * @param propertyKey
 */
export const getProperties = (target: any, propertyKey: string) => {
  return Reflect.getMetadata(formatMetadataKey, target, propertyKey);
};