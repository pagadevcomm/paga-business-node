'use strict';
const PagaBusinessClient = require('../PagaBusinessClient')
const expect  = require('chai').expect;

var pagaBusinessClient = PagaBusinessClient.Builder()
    .setPrincipal("98F32858-CC3B-42D4-95A3-742110A8D405")
    .setCredential("rR9@f8u@bBES")
    .setApiKey("d98076e2d14c4045970edc466faa2ec8cc47c9b89b654001b5e4db27179a0b9559bee92b78034c558a9d24aca2fa4135db8938a3f4a74b7da1157dee68e15213")
    .setIsTest(true)
    .build();

    describe("BusinessFunctionsTest", function () {

        it("Should getaccesstoken", function (done) {
            pagaBusinessClient.registerCustomer(
                "Jl6ISc",
                "+2347089564437",
                "John",
                "Deo",
                "ibuku@gm.com",
                "2013-04-05",
                "MALE",
                "34, Giuld street, lagos",
                "Ikorodu",
                "Lagos",
                "lagos",
                "ikorodu",
                "err",
                "100001",
                "girl",
                "3345",
                "Married",
                "en",
                "Bawa",
                "Bobai",
                "07034751090",
                "CUSTOMER",
                "3444555",
                "2019-12-08",
                true,
                "Yewande",
                "Friend",
                "FRIEND",
                "+2348035678543").then(function(body){
                // expect(body.data).to.have.property('access_token');
                // expect(body.data).to.have.property('token_type');
                // expect(body.data).to.have.property('refresh_token');
                // expect(body.data).to.have.property('expires_in');
                // expect(body.data).to.have.property('scope');
                // expect(body.data).to.have.property('user_data');
                // expect(body.data).to.have.property('authorities');
                console.log(body)
            done();
        })
    })

    })