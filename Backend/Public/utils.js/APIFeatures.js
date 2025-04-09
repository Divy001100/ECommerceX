const APIFeatures = class{
    constructor(queryString, query) {
        this.queryString =queryString
        this.query = query  
    }
    filter(){
        let qObj = {...this.queryString}
        const excludedVal = ['page','limit','sort','fields']
        excludedVal.forEach(el =>delete qObj[el])
        let queryStr = JSON.stringify(qObj)  
        queryStr= queryStr.replace(/\b(gt|gte|lt|lte)\b/g,(match)=>`$${match}`)
        queryStr = JSON.parse(queryStr)
        this.query = this.query.find(queryStr)


        return this

    }

    sort(){
        if (this.queryString.sort){
          
            const sortBy = this.queryString.sort.split(',').join(' ')
        
            this.query = this.query.sort(sortBy)
       }
       return this

       
    }
    // SELECT LIMIT FIELDS
    select(){
     if(this.queryString.fields){
        const fields = this.queryString.fields.split(',').join(' ')
        this.query = this.query.select(fields)
          
     }else{
        this.query = this.query.select('-__v')
     }
     return this;
    }

    pagination(){
        if(this.queryString.page && this.queryString.limit){
        

            const page = this.queryString.page*1 ||1
            const limit = this.queryString.limit*1 ||10
             const skip = (page-1)*limit
             this.query= this.query.skip(skip).limit(limit)
             
    }
    return this

}
}

module.exports = APIFeatures

// basic filter

// const qObj = {...req.query}
// const excludedVal = ['page','limit','sort','fields']
// excludedVal.forEach(el =>delete qObj[el])
// let queryStr = JSON.stringify(qObj)  
// queryStr= queryStr.replace(/\b(gt|gte|lt|lte)\b/g,(match)=>`$${match}`)
// queryStr = JSON.parse(queryStr)

// let query = Product.find(queryStr)

// sorting
// if (req.query.sort){
//      query = query.sort(req.query.sort)
// }

// select fields
// if(req.query.fields){
//     const sortBy = req.query.fields.split(',').join(' ')
//     query = query.select(sortBy)
    
// }
// sort=-price&price[lt]=20&fields=price,name
// pagination
// if(req.query.page || req.query.limit){
//     const page = req.query.page*1 ||1
//     const limit = req.query.limit*1 ||10
//      const skip = (page-1)*limit
// 








   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   