import { DBClusterStorageType } from "aws-cdk-lib/aws-rds";
import { StorageType } from "../lib/AwsAuroraServerlessStackProps";

export const parseStorageType = (storageType: StorageType): DBClusterStorageType => {
    return storageType === StorageType.AURORA_IOPT1 ? DBClusterStorageType.AURORA_IOPT1 : DBClusterStorageType.AURORA;
}

export const parseStorageTypeFromEnv = (): StorageType => {
    const storageType = process.env.STORAGE_TYPE;
    if (!storageType) {
        throw new Error('STORAGE_TYPE is not set');
    }
    const acceptedValues = [StorageType.AURORA, StorageType.AURORA_IOPT1];
    if (!acceptedValues.includes(storageType as StorageType)) {
        throw new Error(`Invalid STORAGE_TYPE value: ${storageType}`);
    }
    return storageType as StorageType;
}