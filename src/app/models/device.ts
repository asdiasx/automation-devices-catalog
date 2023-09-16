export class Device {
  id!: string;
  name: string;
  type: string;
  localization: string;
  description: string;

  constructor(
    name: string,
    type: string,
    localization: string,
    description: string
  ) {
    this.name = name;
    this.type = type;
    this.localization = localization;
    this.description = description;
  }

  public static clone(device: Device): Device {
    return new Device(
      device.name,
      device.type,
      device.localization,
      device.description
    );
  }
}
