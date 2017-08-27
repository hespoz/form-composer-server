const Validations  = {
    isEmpty : (value) => {
        return value === ""
    },
    isJSON : (value) => {
        try {
            JSON.parse(value);
        } catch (e) {
            return false;
        }
        return true;
    }
};

module.exports = Validations;