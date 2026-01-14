

class Filter {
    key;
    filterFunction;
    constructor(key, filterFunction) {
        this.key = key;
        this.filterFunction = filterFunction;
    }

    getKey() {
        return this.key;
    }


    getFilterFunction() {
        return this.filterFunction;
    }

    getName() {
        let cutoff = this.key.indexOf(':');
        return this.key.substring(cutoff + 1);
    }

}

export default Filter;