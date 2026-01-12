

class Filter {
    name;
    filterFunction;
    constructor(name, filterFunction) {
        this.name = name;
        this.filterFunction = filterFunction;
    }

    getName() {
        return this.name;
    }


    getFilterFunction() {
        return this.filterFunction;
    }

}

export default Filter;