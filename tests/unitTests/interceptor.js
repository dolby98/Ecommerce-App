// This file is having logic of mock request and response

module.exports = {
    mockRequest : () =>{
        const req = {}; //will have body, params, query

        req.body = jest.fn().mockReturnValue(req);
        req.params = jest.fn().mockReturnValue(req);
        req.query = jest.fn().mockReturnValue(req);
        return req;
    },

    mockResponse : () =>{
        const res = {}; //will have status, send

        res.status = jest.fn().mockReturnValue(res);
        res.send = jest.fn().mockReturnValue(res);
        res.json = jest.fn().mockReturnValue(res);
        return res;
    }

}