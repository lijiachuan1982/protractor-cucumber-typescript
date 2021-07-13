// Can use any .json file as test data
declare module "*.json" {
    const value: any;
    export default value;
}