/**
 * Perform coping from sourceObject and past to destinationObject
 * We could adjust deeping of merge by specifiend "maxDeep"
 */
let maxDeep: number = 5;
let currentDeep: number = 0;
export function deepMerge (destinationObject: {[key: string]: any}, sourceObject: {[key: string]: any}): void {
    Object.keys(sourceObject)
        .forEach((key: string) => {
            let value = sourceObject[key];
            if (Array.isArray(value)) {
                destinationObject[key] = [...value];
                return;
            }

            if (typeof value === 'object') {
                if (typeof destinationObject[key] !== 'object') {
                    destinationObject[key] = {};
                }
                currentDeep++;
                if (currentDeep > maxDeep) {
                    destinationObject[key] = {...value};
                } else {
                    deepMerge(destinationObject[key], {...value});
                }
                currentDeep--;
                return;
            }

            destinationObject[key] = sourceObject[key];
        });
}
