import {makeData} from "./Datagenerator";

export  default  resolvers = {
    Query: {
        adomains(root, args, context) {
            const adomains = makeData();

            //For When Generator Function is not working
            // const adomains = [{
            //         adomain: "Adidas.com",
            //         name: "Adidas",
            //         iabCategories: ["IAB12", "IAB2", "IAB5"],
            //         status: "ALLOWED",
            //         rejectionType: "Offensive Content",
            //         rejectionComment: "The content is offensive",
            //         isGeneric: false,
            //         modifiedBy: "Sourav.Prem"
            //     },
            //     {
            //         adomain: "Reebok1.com",
            //         name: "Reebok",
            //         iabCategories: ["IAB1", "IAB2", "IAB5"],
            //         status: "PENDING",
            //         rejectionType: "Offensive Content",
            //         rejectionComment: "The content is offensive",
            //         isGeneric: false,
            //         modifiedBy: "Sourav.Prem"
            //     },
            //     {
            //         adomain: "Reebok.com",
            //         name: "Reebok",
            //         iabCategories: ["IAB1", "IAB2", "IAB5"],
            //         status: "PENDING",
            //         rejectionType: "Offensive Content",
            //         rejectionComment: "The content is offensive",
            //         isGeneric: false,
            //         modifiedBy: "Sourav.Prem"
            //     }
            // ]
            return adomains;
        }
    }
}