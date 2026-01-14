

class Filter {
    key;
    filterFunction;
    name;
    constructor(key, filterFunction) {
        this.key = key;
        this.filterFunction = filterFunction;
        
        let cutoff = this.key.indexOf(':') + 1;
        this.name = this.key.substring(cutoff);
    }

    getKey() {
        return this.key;
    }


    getFilterFunction() {
        return this.filterFunction;
    }

    getName() {
        return this.name;
    }

}

export default Filter;