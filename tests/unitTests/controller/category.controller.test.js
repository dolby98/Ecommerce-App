const categoryController = require('../../../controllers/category.controller');
const { mockRequest, mockResponse } = require('../interceptor');
const categoryData = require('../mockdata/newCategoryData.json');
const model = require('../../../models');
const Category = model.Category;
let req,res;

beforeEach(()=>{
    req = mockRequest();
    res = mockResponse();
    req.body = categoryData;
});

describe('Test for categorycontroller.create', ()=>{

    it("Should call category controller.create and create new category in db successfully", async()=>{
        

        const expectedResp = {
            ...categoryData,
            id : 1
        }

        const spyOnCategoryCreate = jest.spyOn(Category, 'create').mockImplementation((categoryData) =>Promise.resolve(expectedResp));

        await categoryController.create(req,res);
        await expect(spyOnCategoryCreate).toHaveBeenCalled();
        await expect(Category.create).toHaveBeenCalled();

        expect(res.status).toHaveBeenCalled();
        expect(res.send).toHaveBeenCalled();
        expect(res.send).toHaveBeenCalledWith(expectedResp);
        expect(res.status).toHaveBeenCalledWith(201);

    });

    it("Should call category controller.create and fail and go to catch", async()=>{
        req.body = categoryData;

        const expectedResp = {
            message:"Error occured while storing data in DB"
        }

        const spyOnCategoryCreate = jest.spyOn(Category, 'create').mockImplementation((categoryData) =>Promise.reject(Error("This is an error")));

        await categoryController.create(req,res);
        await expect(spyOnCategoryCreate).toHaveBeenCalled();
        await expect(Category.create).toHaveBeenCalled();

        expect(res.status).toHaveBeenCalled();
        expect(res.send).toHaveBeenCalled();
        expect(res.send).toHaveBeenCalledWith(expectedResp);
        expect(res.status).toHaveBeenCalledWith(500);

    });
});

describe("Test for category controller scenarios while updating data", ()=>{

    beforeEach(()=>{
        req.params.id = 1;
    });

    it("It should call Category controller update and successfully update details", async ()=>{

        const expectedResp = {
            ...categoryData,
            id : 1
        }

        const spyOnCategoryUpdate = jest.spyOn(Category, 'update').mockImplementation((categoryData)=>Promise.resolve(expectedResp));

        await categoryController.update(req,res);
        await expect(spyOnCategoryUpdate).toHaveBeenCalled();
        await expect(Category.update).toHaveBeenCalled();

        expect(res.status).toHaveBeenCalled();
        expect(res.send).toHaveBeenCalled();
        expect(res.send).toHaveBeenCalledWith("Successfully updated");
        expect(res.status).toHaveBeenCalledWith(200);

    });

    it("It should call Category controller update and fail ", async ()=>{

        const expectedResp = {
            message:"Error occured while storing data in DB"
        }

        const spyOnCategoryUpdate = jest.spyOn(Category, 'update').mockImplementation((categoryData)=>Promise.reject(Error("Error occurred")));

        await categoryController.update(req,res);
        await expect(spyOnCategoryUpdate).toHaveBeenCalled();
        await expect(Category.update).toHaveBeenCalled();

        expect(res.status).toHaveBeenCalled();
        expect(res.send).toHaveBeenCalled();
        expect(res.send).toHaveBeenCalledWith(expectedResp);
        expect(res.status).toHaveBeenCalledWith(500);

    });


});


describe("Test scenarios to finf a category", ()=>{

    beforeEach(()=>{
        req.params.id = 1;
    });

    it("When we succsfully find a category", async ()=>{

        const spyOnCategoryFindOne = jest.spyOn(Category, 'findByPk').mockImplementation(()=>Promise.resolve(categoryData));

        await categoryController.findOne(req,res);
        await expect(spyOnCategoryFindOne).toHaveBeenCalled();
        await expect(Category.findByPk).toHaveBeenCalled();

        expect(res.status).toHaveBeenCalled();
        expect(res.send).toHaveBeenCalled();
        expect(res.send).toHaveBeenCalledWith(categoryData);
        expect(res.status).toHaveBeenCalledWith(200);

    });

    it("When we error occurred while searching category", async ()=>{

        const expectedResp = {
            message:"Error occured while fetching category data for the category id from DB"
        }

        const spyOnCategoryFindOne = jest.spyOn(Category, 'findByPk').mockImplementation(()=>Promise.reject(Error("error occurred")));

        await categoryController.findOne(req,res);
        await expect(spyOnCategoryFindOne).toHaveBeenCalled();
        await expect(Category.findByPk).toHaveBeenCalled();

        expect(res.status).toHaveBeenCalled();
        expect(res.send).toHaveBeenCalled();
        expect(res.send).toHaveBeenCalledWith(expectedResp);
        expect(res.status).toHaveBeenCalledWith(500);

    });
});

describe("Test scenario to delete category", ()=>{

    beforeEach(()=>{
        req.params.id = 1;
    });

    it("Delete category successfully", async()=>{

        const spyOnCategoryDelete = jest.spyOn(Category, 'destroy').mockImplementation(()=>Promise.resolve(categoryData));

        await categoryController._delete(req,res);
        await expect(spyOnCategoryDelete).toHaveBeenCalled();
        await expect(Category.destroy).toHaveBeenCalled();

        expect(res.status).toHaveBeenCalled();
        expect(res.send).toHaveBeenCalled();
        expect(res.send).toHaveBeenCalledWith("Succesfullly deleted");
        expect(res.status).toHaveBeenCalledWith(200);        
    });

    it("Delete category error", async()=>{

        const expectedResp = {
            message:"Error occured while storing data in DB"
        }

        const spyOnCategoryDelete = jest.spyOn(Category, 'destroy').mockImplementation(()=>Promise.reject(Error("Error occurred")));

        await categoryController._delete(req,res);
        await expect(spyOnCategoryDelete).toHaveBeenCalled();
        await expect(Category.destroy).toHaveBeenCalled();

        expect(res.status).toHaveBeenCalled();
        expect(res.send).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith(expectedResp);
                
    });
});

describe('tests for category.controller.findall', ()=>{

    it('it should call without any parameter', async()=>{

        const spyOnCategoryFindAll = jest.spyOn(Category, 'findAll').mockImplementation(()=>Promise.resolve(categoryData));

        await categoryController.findAll(req,res);
        await expect(spyOnCategoryFindAll).toHaveBeenCalled();
        await expect(Category.findAll).toHaveBeenCalled();

        expect(res.status).toHaveBeenCalled();
        expect(res.json).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(categoryData);

    });

    it('it should call with category parameter', async()=>{

        // const queryParam = {
        //     where:{
        //         name : 
        //     }
        // }
        req.query.name = 'Electronics';

        const spyOnCategoryFindAll = jest.spyOn(Category, 'findAll').mockImplementation(()=>Promise.resolve(categoryData));

        await categoryController.findAll(req,res);
        await expect(spyOnCategoryFindAll).toHaveBeenCalled();
        await expect(Category.findAll).toHaveBeenCalled();

        expect(res.status).toHaveBeenCalled();
        expect(res.json).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(categoryData);

    });

    it('it should call fail for category.findall', async()=>{

        const spyOnCategoryFindAll = jest.spyOn(Category, 'findAll').mockImplementation(()=>Promise.reject(Error("Error occurred")));

        await categoryController.findAll(req,res);
        await expect(spyOnCategoryFindAll).toHaveBeenCalled();
        await expect(Category.findAll).toHaveBeenCalled();

        expect(res.status).toHaveBeenCalled();
        expect(res.send).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith({
            message:"Error occured while fetching category data for all category by name of category from DB"
        });

    });

});