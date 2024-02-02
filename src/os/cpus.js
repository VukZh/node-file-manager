import {cpus} from "os";

const myCPUs = () => {
    return cpus().map(cpu => ({model: cpu.model, speed: cpu.speed / 1000})) // speed MHz > GHz
};
export default myCPUs;
