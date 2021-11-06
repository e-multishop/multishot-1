const CommonUtils = {
    getSize: (value) => {
        const sizes = [{
            name: "XS US women's letter",value:'1'
        }, {
            name: "S US women's letter", value: '2'
        }, {
            name: "M US women's letter", value: '3'
        }, {
            name: "L US women's letter", value: '4'
        }, {
            name: "XL US women's letter", value: '5'
        }, {
            name: "XXL US women's letter", value: '6'
        },{
            name: "OX US women's letter", value: '7'
        }];
        const filteredValue = sizes.filter(s => s.value === value.toString());
        if (filteredValue && filteredValue.length > 0) {
            return filteredValue[0].name;
        }
        return value;
    }
};

export default CommonUtils;