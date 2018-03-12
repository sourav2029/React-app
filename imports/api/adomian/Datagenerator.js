import namor from 'namor';


const range = len => {
    const arr = [];
    for (let i = 0; i < len; i++) {
        arr.push(i);
    }
    return arr;
};

const newDomain = (id) => {
    const iabCategories = ["IAB1", "IAB2", "IAB3", "IAB4", "iAB5", "IAB6", "IAB7", "IAB8", "IAB9", "IAB10", "IAB11",
        "IAB12", "IAB13", "IAB14"];
    const statusChance = Math.random();
    const categories = [];
    for (let i =0 ; i<Math.random()*5; i++){
        categories.push(iabCategories[parseInt(Math.random()*13)]);
    }
    const adomain = namor.generate({ words: 1, numbers: 0 });
    const name = namor.generate({ words: 1, numbers: 0 });
    const isGeneric = (statusChance == 1? true : false);
    const status = (statusChance > 0.66 && statusChance < 1 ? "ALLOWED" : statusChance > 0.33 ? "PENDING" : "REJECTED");
    if(status == "REJECTED"){
       var rejectionType = namor.generate({words:2, numbers:0});
       var rejectionComment = namor.generate({words:4, numbers:0});
    }
    return {
        id : id,
        adomain: adomain,
        name: name,
        rejectionType : rejectionType,
        rejectionComment : rejectionComment,
        iabCategories: categories,
        modifiedBy : namor.generate({words:1, numbers:0}),
        isGeneric : isGeneric ,
        status: status
    };
};

export function makeData(len = 5553) {
    return range(len).map(d => {
        return {
            ...newDomain(d),
            children: range(10).map(newDomain)
        };
    });
}