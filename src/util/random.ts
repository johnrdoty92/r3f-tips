import { MathUtils, Matrix4, Vector3 } from "three";

const getRandomCoordinate = (bounds: number) => {
 return MathUtils.lerp(
  -bounds,
  bounds,
  Math.random(),
 );
};
const defaultBounds = 50;
const position = new Vector3();
export const getRandomPosition = (
 target = position,
 bounds = defaultBounds,
) => {
 return target.set(
  getRandomCoordinate(bounds),
  getRandomCoordinate(bounds),
  getRandomCoordinate(bounds),
 );
};

const temp = new Matrix4();
const axis = new Vector3();
export const getRandomRotationMtx = (mtx = temp) => {
 return mtx.makeRotationAxis(
  axis.randomDirection(),
  Math.PI * 2 * Math.random(),
 );
};
