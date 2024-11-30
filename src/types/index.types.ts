type Device = {
  id?: string | number;
  deviceName?: string;
  assignedUsername?: string;
  type?: string;
  os?: string | undefined;
  browser?: string | undefined;
  model?: string | undefined;
  avatar?: string;
};

type Coordinates = {
  x: number;
  y: number;
};

type CurrentDevice = {
  id?: string | number;
  data: Device;
};

type DetectedDevice = {
  id: string | number;
  data: Device;
  coords: Coordinates;
};
