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
            this.mergeProperty(destinationObject[key], value);
            return;
        }

        destinationObject[key] = sourceObject[key];
    });
}
