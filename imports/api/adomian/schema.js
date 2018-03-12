export default typeDefs = `
    type Query {
        adomains: [Adomain]
    }

    enum Status {
        PENDING
        ALLOWED
        REJECTED
    }

    type Adomain {
        adomain : String,
        name : String,
        iabCategories : [String],
        status : Status!
        rejectionComment :String,
        rejectionType : String,
        isGeneric : Boolean,
        modifiedBy : String
    }
`
;