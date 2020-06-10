const axios = require('axios')
const sha512 = require('js-sha512').sha512;
const unirest = require('unirest');

function PagaBusinessClient(build){

    this.principal = build.clientId;
    this.password = build.password;
    this.hash = build.apiKey;
    this.test = build.test; 

	const test_server = "https://beta.";
	const live_server = "https://www.";
    const service_url = "mypaga.com/paga-webservices/business-rest/";

    this.buildRequest = (uri, hash, body) => {
        return axios({
            method: 'post',
            url: uri,
            headers: {'content-type': 'application/json',
                      'Accept': 'application/json',
                      'principal' : this.principal,
                      'credentials': this.password,
                      'hash': hash
                      },
            data: body,    
            
            timeout: 120000,
      
          });
    }

    this.arr = function(...ele) {
        var list = []
        if(ele == null || ele == "") {
            return null
        }
        ele.forEach(function(element){
            list.push(element)
        })
        return list
    }

    this.buildFormRequest = (uri, hash, body) => {
        // return axios({
        //     method: 'post',
        //     url: uri,
        //     headers: {
        //         'content-type': 'multipart/form-data',
        //         'boundary' : 'TEIJNCQ5bVQ6ocfU4BSpKzMEZ2nN7t',
        //         'boundary': '6o2knFse3p53ty9dmcQvWAIx1zInP11uCfbm',
        //         'Accept': 'application/json',
        //         'principal' : this.principal,
        //         'credentials': this.password,
        //         'hash': hash,
        //         'Content-Disposition': 'form-data',
        //         'name': 'customer',
        //         'filename': 'file',
        //         'Content-Type' : 'application/json',
        //         'Accept': 'application/json'
        //     },
        //     data:  body,       
            
        //     timeout: 120000,
      
        //   });
           unirest.post(uri)
        .headers({
            'content-type': 'multipart/form-data',
                'boundary' : 'TEIJNCQ5bVQ6ocfU4BSpKzMEZ2nN7t',
                'boundary': '6o2knFse3p53ty9dmcQvWAIx1zInP11uCfbm',
                'Accept': 'application/json',
                'principal' : this.principal,
                'credentials': this.password,
                'hash': hash,
                'Content-Disposition': 'form-data',
                'name': 'customer',
                'filename': 'file',
                'Content-Type' : 'application/json',
                'Accept': 'application/json'
        })
        .field("customer", body) // Form field
        // .attach('file', '/tmp/file') // Attachment
        .end(function (response) {
        console.log(response.body);
});
console.log(unirest.request)
    }

    this.formatDate = (date, separator) => {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;
    
        return [year-month-day].join(separator);
    }

    this.createHashSHA512 = (message, iterations, returnHex) => {

        var hash = sha512.create()
        hash.update(message)

        var byteTemp = hash.digest();
        var digest;

        for (var i = 1; i < iterations; i++){
            byteTemp = hash.digest();
            hash.update(byteTemp);
        }

        if (iterations == 1){
            digest = hash.digest(message);
        }else{
            digest = hash.digest(byteTemp);
        }

        if (returnHex){
            return hash.hex(digest);
        }else{
            return digest;
        }

    }

/**
 * @param   {string}  referenceNumber        A unique reference number for this request. This same reference number will be returned in the response.
 * @param   {string}  customerPhoneNumber    The phone number of the new customer. This number must not belong to an existing registered customer
 * @param   {string}   customerEmail         The email of the new customer  
 * @param   {string}  customerFirstName      The first name of the customer
 * @param   {string}  customerLastName       The Last name of the customer
 * @param   {string}  customerDateOfBirth    Birth date of the customer
 * @param   {string}  customerGender       The gender of the new customer. Must be on of (FEMALE, MALE)
 * @param   {Object}  customerAddress       The Address of the new customer
 * @param   {string}  customerAddress.country     The country of the address. Must be provided is address is provided
 * @param   {string}  customerAddress.region       The region/state of the address. Must be provided is address is provided
 * @param   {string}  customerAddress.county       The county/zone of the address.
 * @param   {string}  customerAddress.city       The city of the address.
 * @param   {string}  customerAddress.localGovernmentArea       The local government area/district of the address.
 * @param   {string}  customerAddress.streetAddress       The street address of the address
 * @param   {string}  customerAddress.postalCode       The postal code of the address
 * @param   {string}  customerAddress.landmark       A landmark for the the address
 * @param   {string}  customerAddress.freeformAddress     A free-form description of the address
 * @param   {string}  customerMaritalStatus    The marital status of the new customer. Must be one of (SINGLE, MARRIED, DIVORCED)
 * @param   {string}  customerPreferredLanguageISOCode         The ISO 639-1 code of the new customer’s preferred language. Must be a valid ISO 639-1 code. See: https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes
 * @param   {string}  customerReferredByPhoneNumber              The phone number of the person who referred the new customer
 * @param   {string}  customerReferredByFirstName            The first name of the person who referred the new customer
 * @param   {string}  customerReferredByLastName           The last name of the person who referred the new customer
 * @param   {string}  customerIdType           The type of identification captured for th new customer. Must be one of (DRIVERS_LICENCE, NATIONAL_ID, PASSPORT, VOTERS_CARD)
 * @param   {string}  customerIdNumber            The number of the identification captured for the new customer. This must be provided if customerIdType is provided
 * @param   {string}  customerIdExpirationDate           The expiration date of the identification captured for th new customer. Format must be YYYY-MM-DD
 * @param   {Boolean}  optinForWalletSavings            If the customer opted in for transactional savings wallet
 * @param   {Object}  customerSupplementaryDetails            A name/value map of additional customer details captured
 * @param   {String}  customerSupplementaryDetails.nextOfKinLastName            A name/value map of additional customer details captured
 * @param   {String}  customerSupplementaryDetails.nextOfKinFirstName            A name/value map of additional customer details captured
 * @param   {String}  customerSupplementaryDetails.nextOfKinType            A name/value map of additional customer details captured
 * @param   {String}  customerSupplementaryDetails.nextOfKinPhoneNumber            A name/value map of additional customer details captured
 * 
 * @return {Promise}                         A Promise Object thats receives the response
 *         Sample Successful response =>    {
                                                "message":"Thank for registering to paga. We will send SMS to +251911010862 with a registeration code. Please use www.mypaga.com or dial 636 to set up your user PIN.",
                                                "referenceNumber":"",
                                                "responseCode":0,
                                                "pagaAccountNumber: 123456789"
                                            }
 */
    this.registerCustomer = async (
                referenceNumber,        
                customerPhoneNumber,             
                customerFirstName,      
                customerLastName,
                customerEmail,       
                customerDateOfBirth,    
                customerGender,
                customerAddressCountry,
                customerAddressRegion,
                customerAddressCounty, 
                customerAddressCity,
                customerAddressLocalGovernmentArea,
                customerAddressStreetAddress,
                customerAddressPostalCode, 
                customerAddressLandmark,
                customerAddressFreeformAddress,
                customerMaritalStatus,
                customerPreferredLanguageISOCode, 
                customerReferredByFirstName,      
                customerReferredByLastName, 
                customerReferredByPhoneNumber,
                customerIdType,
                customerIdNumber,
                customerIdExpirationDate, 
                optinForWalletSavings,
                customerSupplementaryDetailsNextOfKinLastName, 
                customerSupplementaryDetailsNextOfKinFirstName,
                customerSupplementaryDetailsNextOfKinType,
                customerSupplementaryDetailsNextOfKinPhoneNumber ) => {

            var dob = (customerDateOfBirth != null) ? this.formatDate(customerDateOfBirth,'/'): null;

            var doe = (customerIdExpirationDate != null) ? this.formatDate(customerIdExpirationDate,'/'): null;
           
            var server = (this.test) ? test_server : live_server;

            var obj = {
                "referenceNumber": referenceNumber,
                "customerPhoneNumber": customerPhoneNumber,
                "customerFirstName": customerFirstName,
                "customerLastName": customerLastName,
                "customerEmail": customerEmail,
                "customerDateOfBirth" : ((dob != null) ? dob : null),
                "customerGender": customerGender,
                "customerAddress": { 
                    "country": customerAddressCountry,
                    "region": customerAddressRegion,
                    "county" : customerAddressCounty,
                    "city" : customerAddressCity,
                    "localGovernmentArea": customerAddressLocalGovernmentArea,
                    "streetAddress": customerAddressStreetAddress,
                    "postalCode" : customerAddressPostalCode,
                    "landmark": customerAddressLandmark,
                    "freeformAddress": customerAddressFreeformAddress,

                },
                "customerMaritalStatus": customerMaritalStatus,
                "customerPreferredLanguageISOCode": customerPreferredLanguageISOCode,
                "customerReferredByFirstName": customerReferredByFirstName,
                "customerReferredByLastName": customerReferredByLastName,
                "customerReferredByPhoneNumber": customerReferredByPhoneNumber,
                "customerIdType": customerIdType,
                "customerIdNumber": customerIdNumber,
                "customerIdExpirationDate": ((doe != null) ? doe : null),
                "optinForWalletSavings": optinForWalletSavings,
                "customerSupplementaryDetails":{ 
                    "NextOfKinLastName": customerSupplementaryDetailsNextOfKinLastName,
                    "NextOfKinFirstName": customerSupplementaryDetailsNextOfKinFirstName,
                    "NextOfKinType": customerSupplementaryDetailsNextOfKinType,
                    "NextOfKinPhoneNumber": customerSupplementaryDetailsNextOfKinPhoneNumber
                }
            }

            var sBuilder = []
            sBuilder.push(referenceNumber + customerPhoneNumber + customerFirstName + customerLastName + this.hash)
            sBuilder.join("")

            var hashString = this.createHashSHA512(sBuilder.toString(), 1, true).toString();
 
            var response
            try {
                response = await this.buildFormRequest(server + service_url + "secured/registerCustomer", hashString, obj)
            } catch (error) {
                response = {
                    "errorCode" : -1,
                    "exception" : error,
                }
            } finally {
                return response;
            }

        }

/**
 * @param   {string}  referenceNumber               A unique reference number for this request. This same reference number will be returned in the response
 * @param   {string}  customerPhoneNumber           The phone number of the customer. This number must belong to an existing customer the YOU registered
 * 
 * 
 * @return  {Promise}                               A Promise Object thats receives the response
 * 
 *  * Sample Successful Response =>    {
 *                                          "message" : "Photo upload failed: User account photo has already been set",
                                            "referenceNumber" : null
                                        }

 */
 this.registerCustomerAccountPhoto = async (
            referenceNumber, 
            customerPhoneNumber, customerAccountPhoto ) => {
                   
                var server = (this.test) ? test_server : live_server;

                var obj = {
                    "referenceNumber" : referenceNumber,
                    "customerPhoneNumber": customerPhoneNumber,
                    "customerAccountPhoto" : customerAccountPhoto
                }
        
                var sBuilder = []
                sBuilder.push(referenceNumber + customerPhoneNumber + this.hash)
                sBuilder.join("")
        
                var hashString = this.createHashSHA512(sBuilder.toString(), 1, true).toString();
        
                var response
                try {
                    response = await this.buildFormRequest(server + service_url + "secured/registerCustomerAccountPhoto", hashString, obj)
                } catch (error) {
                    response = {
                        "errorCode" : -1,
                        "exception" : error,
                    }
                } finally {
                    return response;
                }

        }


/**
 * @param   {Object}  customer                The customer’s details
 * @param   {File}  customerIdPhoto           Photograph of the customer identification document Must be one of image types (). Image sze be ⇐ 500kb
 * 
 * 
 * @return  {Promise}                               A Promise Object thats receives the response
 * 
 *  * Sample Successful Response =>    {
 *                                          "message" : "Photo upload failed: User account photo has already been set",
                                            "referenceNumber" : null
                                        }

 */
this.registerCustomerIdentification = async (
    referenceNumber, 
    customerPhoneNumber, 
    customerIdType,  
    customerIdNumber, 
    customerIdExpirationDate,
    customerIdPhoto ) => {
           
        var server = (this.test) ? test_server : live_server;

        var obj = {
            "referenceNumber" : referenceNumber,
            "customerPhoneNumber": customerPhoneNumber,
            "customerIdType": customerIdType,
            "customerIdNumber": customerIdNumber,
            "customerIdExpirationDate": customerIdExpirationDate
        }

        var sBuilder = []
        sBuilder.push(referenceNumber + customerPhoneNumber + customerIdType + customerIdNumber + customerIdExpirationDate + this.hash)
        sBuilder.join("")

        var hashString = this.createHashSHA512(sBuilder.toString(), 1, true).toString();

        var response
        try {
            response = await this.buildFormRequest(server + service_url + "secured/registerCustomerIdentification", hashString, obj)
        } catch (error) {
            response = {
                "errorCode" : -1,
                "exception" : error,
            }
        } finally {
            return response;
        }

}

/**
 * @param   {string}  referenceNumber               A unique reference number provided by the business, identifying the transaction. This reference number will be preserved on the Paga platform to reconcile the operation across systems and will be returned in the response.
 * @param   {number}  amount                        The amount of money to transfer to the recipient.
 * @param   {number}  currency                      The currency of the operation, if being executed in a foreign currency.
 * @param   {string}  destinationAccount            The account identifier for the recipient receiving the money transfer. This account identifier may be a phone number, account nickname, or any other unique account identifier supported by the Paga platform. If destinationBank is specified, this is the bank account number.
 * @param   {string}  destinationBank               For money transfers to a bank account, this is the destination bank code.
 * @param   {string}  senderPrincipal               The authentication principal for the user sending money if the money is being sent on behalf of a user. If null, the money transfer will be processed from the 3rd parties own account.
 * @param   {string}  senderCredentials             The authentication credentials for the user sending money if the money is being sent on behalf of a user.
 * @param   {boolean} sendWithdrawalCode            If the cash is being sent on behalf of the third party itself (i.e. sender principal is null), then this indicates whether confirmation messages for funds sent to non Paga customers will include the withdrawal code in the message (true) or omit it (false). If false, then the withdrawal code will be returned in the withdrawalCode response parameter. For funds sent to Paga customers, the funds are deposited directly into the customer's account so no withdrawal code is necessary. Defaults to true.
 * @param   {string}  sourceOfFunds                 The name of a source account for funds. If null, the source sender's Paga account will be used as the funding source.
 * @param   {string}  transferReference             Additional transfer-specific reference information that may be required for transfer processing.
 * @param   {boolean} suppressRecipientMessage      Whether to prevent sending an SMS to the recipient of the money transfer. This can be used in cases where the business wishes to perform their own messaging. Defaults to false, meaning that messages are NOT suppressed.
 * @param   {string}  locale                        The language/locale to be used in messaging. If provided, this must conform to the IETF language tag standard.
 * @param   {string}  alternateSenderName           If the cash is being sent on behalf of the third party itself (i.e. sender principal is null), then an alternative name-of-sender can be specified here for use in the message sent to the money transfer recipient. This field is ignored if money transfer is sent on behalf of another user. This can be 16 characters in length.
 * @param   {number}  holdingPeriod                 The number of days with which the recipient's KYC must have before it is reverted back to the sender. It is only valid if the minKYCLevel is set and it's default to 120 days. If minKYCLevel is set and the recipient?s KYC is below it, then this will be the number of days it should wait to meet the minKYC Level provided. If the target KYC is not upgraded within this period the fund will be returned back to the sender?s account.
 * @param   {string}  miniRecipentKYCLevel          The minimum target KYC level the money transfer transaction recipient's paga account must have, can be one of KYC1, KYC2, and KYC3.


 * 
 * @return {Promise}                                A Promise Object thats receives the response
 * 
 * Sample Successful Response =>    {
                                        "message":"Thank for registering to paga. We will send SMS to +251911010862 with a registeration code. Please use www.mypaga.com or dial 636 to set up your user PIN.", 
                                        "responseCode":0, "referenceNumber": "","withdrawalCode": "", 
                                        "transactionId": "",  "fee": "", "receiverRegistrationStatus": "",  
                                        "currency": "", "exchangeRate": ""
                                    }
 * 
 * 
 */
this.moneyTransfer = async (
                referenceNumber,
                amount,
                currency,
                destinationAccount,
                destinationBank, 
                senderPrincipal,
                senderCredentials,
                withdrawalCode,
                sourceOfFunds,  
                transferReference, 
                suppressRecipientMsg, 
                locale, 
                alternateSenderName,
                minRecipientKYCLevel,
                holdingPeriod ) => {
       
        var server = (this.test) ? test_server : live_server;

        var obj = {
            "referenceNumber" : referenceNumber,
            "amount" : amount,
            "currency" : currency,
            "destinationAccount" : destinationAccount,
            "destinationBank" : destinationBank,
            "senderPrincipal" : senderPrincipal,
            "senderCredentials" :senderCredentials,
            "sendWithdrawalCode" : withdrawalCode,
            "sourceOfFunds" : sourceOfFunds,
            "transferReference" : transferReference,
            "suppressRecipientMsg" : suppressRecipientMsg,
            "locale" : locale,
            "alternateSenderName" : alternateSenderName,
            "minRecipientKYCLevel" : minRecipientKYCLevel,
            "holdingPeriod" : holdingPeriod
        }

        var sBuilder = []
        sBuilder.push(referenceNumber + amount + destinationAccount + this.hash)
        sBuilder.join("")

        var hashString = this.createHashSHA512(sBuilder.toString(), 1, true).toString();

        var response
        try {
            response = await this.buildRequest(server + service_url + "secured/moneyTransfer", hashString, obj)
        } catch (error) {
            response = {
                "errorCode" : -1,
                "exception" : error,
            }
        } finally {
            return response;
        }

    }


/**
 * @param   {string}    referenceNumber             A unique reference number provided by the business, identifying the transaction. This reference number will be preserved on the Paga platform to reconcile the operation across systems and will be returned in the response.
 * @param   {number}    amount                      The amount of airtime to purchase.
 * @param   {number}    currency                    The currency of the operation, if being executed in a foreign currency.
 * @param   {string}    destinationPhoneNumber      The phone number for which airtime is being purchased. If null, and ­­­­Principal is specified, then the airtime will be purchased for the phone number of the purchaserPrincipal. Must be provided if the purchaserPrincipal is null.
 * @param   {string}    purchaserPrincipal          The authentication principal for the user purchasing airtime if the airtime is being purchased on behalf of a user. If null, the airtime will be processed from the 3rd parties own account.
 * @param   {string}    purchaserCredentials        The authentication credentials for the user purchasing the airtime if the airtime is being purchased on behalf of a user.
 * @param   {string}    sourceOfFunds               The name of a source account for funds. If null, the source purchaser's Paga account will be used as the funding source.
 * @param   {string}    locale                      The language/locale to be used in messaging. If provided, this must conform to the IETF language tag standard.
 
 * @return {Promise}                                A Promise Object thats receives the response

    Sample Successful Response =>   {
                                        "referenceNumber":"+251911314250", 
                                        "message":"Airtime purchase request made successfully",
                                        "responseCode":0, ,”transactionId”:”At34”,”fee”:50.0,
                                        ”currency”:null,“exchangeRate”:null 
                                    }


 */
this.airtimePurchase = async (
                referenceNumber,
                amount, 
                currency, 
                destinationPhoneNumber, 
                purchaserPrincipal, 
                purchaserCredentials, 
                sourceOfFunds, 
                locale ) => {
       
    var server = (this.test) ? test_server : live_server;

    var obj = {
       "referenceNumber" : referenceNumber,
       "amount" : amount,
       "currency" : currency,
       "destinationPhoneNumber" : destinationPhoneNumber,
       "purchaserPrincipal" : purchaserPrincipal,
       "purchaserCredentials" : purchaserCredentials,
       "sourceOfFunds" : sourceOfFunds,
       "locale" : locale
    }

    var sBuilder = []
    sBuilder.push(referenceNumber + amount + destinationPhoneNumber + this.hash)
    sBuilder.join("")

    var hashString = this.createHashSHA512(sBuilder.toString(), 1, true).toString();

    var response
    try {
        response = await this.buildRequest(server + service_url + "secured/airtimePurchase", hashString, obj)
    } catch (error) {
        response = {
            "errorCode" : -1,
            "exception" : error,
        }
    } finally {
        return response;
    }

}





/**
 * @param   {string}    referenceNumber             A unique reference number provided by the business, identifying the transaction. This reference number will be preserved on the Paga platform to reconcile the operation across systems and will be returned in the response.
 * @param   {number}    amount                      The amount of the merchant payment.
 * @param   {number}    currency                    The currency of the operation, if being executed in a foreign currency.
 * @param   {string}    merchantAccount             The account number identifying the merchant (eg. merchant Id, UUID).
 * @param   {string}    merchantReferenceNumber     The account/reference number identifying the customer on the merchant's system.
 * @param   {string}    merchantService             The list of merchant service codes specifying which of the merchant's services are being paid for.
 * @param   {string}    purchaserPrincipal          The authentication principal for the user paying the merchant if the payment is being made on behalf of a user. If null, the airtime will be processed from the 3rd parties own account.
 * @param   {string}    purchaserCredentials        The authentication credentials for the user paying the merchant if the payment is being made on behalf of a user.
 * @param   {string}    sourceOfFunds               The name of a source account for funds. If null, the source purchaser's Paga account will be used as the funding source.
 * @param   {string}    locale                      The language/locale to be used in messaging. If provided, this must conform to the IETF language tag standard.
 
 * @return {Promise}                                A Promise Object thats receives the response

    Sample Successful Response =>   {
                                        "referenceNumber":"+251911314250", "merchantTransactionReference": "", 
                                        "message":"Airtime purchase request made successfully","responseCode":0,
                                        ”transactionId”:”At34”,”fee”:50.0,”currency”:null,“exchangeRate”:null 
                                    }

 */
this.merchantPayment = async (
                merchantReferenceNumber,
                amount,  
                merchantAccount, 
                referenceNumber,
                currency, 
                merchantService,
                purchaserPrincipal, 
                purchaserCredentials, 
                sourceOfFunds, 
                locale ) => {
       
    var server = (this.test) ? test_server : live_server;

    var obj = {
       "merchantReferenceNumber" : merchantReferenceNumber,
       "amount" : amount,
       "merchantAccount" : merchantAccount,
       "referenceNumber" : referenceNumber,
       "currency" : currency,
       "merchantService" : this.arr(merchantService),
       "purchaserPrincipal" : purchaserPrincipal,
       "purchaserCredentials" : purchaserCredentials,
       "sourceOfFunds" : sourceOfFunds,
       "locale" : locale
    }

    var sBuilder = []
    sBuilder.push(referenceNumber + amount + merchantAccount + merchantReferenceNumber + this.hash)
    sBuilder.join("")

    var hashString = this.createHashSHA512(sBuilder.toString(), 1, true).toString();

    var response
    try {
        response = await this.buildRequest(server + service_url + "secured/merchantPayment", hashString, obj)
    } catch (error) {
        response = {
            "errorCode" : -1,
            "exception" : error,
        }
    } finally {
        return response;
    }

}




/**
 * @param   {string}    referenceNumber                     A unique reference number provided by the business, identifying the transaction. This reference number will be preserved on the Paga platform to reconcile the operation across systems and will be returned in the response.
 * @param   {number}    amount                              The amount of money to deposit to the destination bank and bank account provided. Your Paga account must contain sufficient funds to cover this amount plus any fees.
 * @param   {number}    currency                            The currency of the operation, if being executed in a foreign currency. The currency must be one of the currencies supported by the platform. For supported currencies, check with Paga integration operations support.
 * @param   {string}    destinationBankUUID                 The Paga bank UUID identifying the bank to which the deposit will be made. In order to get the list of supported banks and bank UUIDs, execute the getBanks operation defined in this document. Bank codes will not change though additional banks may be added to the list in the future.
 * @param   {string}    destinationBankAccountNumber        The ten digit NUBAN bank account number for the account to which the deposit will be made. This number should be a valid account number for the destination bank as specified by the destinationBankCode parameter above. Executing operation will validate this number and if valid, return the account holder name as stored at the bank for this account.
 * @param   {string}    recipientPhoneNumber                The mobile phone number of the recipient of the deposit to bank transaction. Either one or both of this parameter and the recipientEmail parameter must be provided. If this parameter is provided, this operation will validate that it is a valid phone number.
 * @param   {string}    recipientMobileOperatorCode         Ignored if recipientPhoneNumber parameter is not provided. This describes the mobile operator that the recipientPhoneNumber belongs to. If recipientPhoneNumber is provided, but this parameter is not, a default mobile operator will selected based on the phone number pattern, but this may not be correct due to number portability of mobile phone numbers and may result in delayed or failed delivery of any SMS messages to the recipient.
 * @param   {string}    recipientEmail                      The email address of the recipient of the deposit to bank transaction. Either one or both of this parameter and the recipientPhoneNumber parameter must be provided. If this parameter is provided, this operation will validate that it is a valid email address format.
 * @param   {string}    recipientName                       The name of the recipient. This parameter is currently bot validated.
 * @param   {string}    locale                              The language/locale to be used in messaging. If provided, this must conform to the IETF language tag standard.
 
 * @return {Promise}                                        A Promise Object thats receives the response

    Sample Successful Response =>   {
                                        "referenceNumber":"+251911314250", 
                                        "message":"Airtime purchase request made successfully",
                                        "responseCode":0, , "fee":50.0, "destinationAccountHolderNameAtBank":null
                                    }

 */
this.validateDepositToBank = async (
                referenceNumber, 
                amount, 
                currency, 
                destinationBankUUID, 
                destinationBankAccountNumber, 
                recipientPhoneNumber, 
                recipientMobileOperatorCode, 
                recipientEmail, 
                recipientName, 
                locale ) => {
       
    var server = (this.test) ? test_server : live_server;

    var obj = {
       "referenceNumber" : referenceNumber,
       "amount" : amount,
       "currency" : currency,
       "destinationBankUUID" : destinationBankUUID,
       "destinationBankAccountNumber" : destinationBankAccountNumber,
       "recipientPhoneNumber" : recipientPhoneNumber,
       "recipientMobileOperatorCode" : recipientMobileOperatorCode,
       "recipientEmail" : recipientEmail,
       "recipientName" : recipientName,
       "locale" : locale
    }

    var sBuilder = []
    sBuilder.push(referenceNumber + amount + destinationBankUUID + destinationBankAccountNumber + this.hash)
    sBuilder.join("")

    var hashString = this.createHashSHA512(sBuilder.toString(), 1, true).toString();

    var response
    try {
        response = await this.buildRequest(server + service_url + "secured/validateDepositToBank", hashString, obj)
    } catch (error) {
        response = {
            "errorCode" : -1,
            "exception" : error,
        }
    } finally {
        return response;
    }

}





/**
 * @param   {string}    referenceNumber                     A unique reference number provided by the business, identifying the transaction. This reference number will be preserved on the Paga platform to reconcile the operation across systems and will be returned in the response.
 * @param   {number}    amount                              The amount of money to deposit to the destination bank and bank account provided. Your Paga account must contain sufficient funds to cover this amount plus any fees.
 * @param   {string}    currency                            The currency of the operation, if being executed in a foreign currency. The currency must be one of the currencies supported by the platform. For supported currencies, check with Paga integration operations support.
 * @param   {string}    destinationBankUUID                 The Paga bank UUID identifying the bank to which the deposit will be made. In order to get the list of supported banks and bank UUIDs, execute the getBanks operation defined in this document. Bank codes will not change though additional banks may be added to the list in the future.
 * @param   {string}    destinationBankAccountNumber        The ten digit NUBAN bank account number for the account to which the deposit will be made. This number should be a valid account number for the destination bank as specified by the destinationBankCode parameter above. Executing operation will validate this number and if valid, return the account holder name as stored at the bank for this account.
 * @param   {string}    recipientPhoneNumber                The mobile phone number of the recipient of the deposit to bank transaction. Either one or both of this parameter and the recipientEmail parameter must be provided. If this parameter is provided, this operation will validate that it is a valid phone number.
 * @param   {string}    recipientMobileOperatorCode         Ignored if recipientPhoneNumber parameter is not provided. This describes the mobile operator that the recipientPhoneNumber belongs to. If recipientPhoneNumber is provided, but this parameter is not, a default mobile operator will selected based on the phone number pattern, but this may not be correct due to number portability of mobile phone numbers and may result in delayed or failed delivery of any SMS messages to the recipient.
 * @param   {string}    recipientEmail                      The email address of the recipient of the deposit to bank transaction. Either one or both of this parameter and the recipientPhoneNumber parameter must be provided. If this parameter is provided, this operation will validate that it is a valid email address format.
 * @param   {string}    recipientName                       The name of the recipient. This parameter is currently bot validated.
 * @param   {string}    alternateSenderName                 In notifications sent to the recipient, your business display name (if set), or business name (if display name not set) is included. If you wish notifications to indicate the deposit to bank as coming from an alternate name, you may set the alternate name in this parameter. This parameter length is limited to 20 characters and will be truncated if longer.
 * @param   {string}    suppressRecipientMessage            If this field is set to true, no notification message (SMS or email) will be sent to the recipient. IF omitted or set to false, an email or SMS will be sent to recipient as described above.
 * @param   {string}    remarks                             Additional bank transfer remarks that you may wish to appear on your bank statement record for this transaction. Remarks are limited to 30 characters and will be truncated if longer.
 * @param   {string}    locale                              The language/locale to be used in messaging. If provided, this must conform to the IETF language tag standard.
 
 * @return {Promise}                                        A Promise Object thats receives the response

    Sample Successful Response =>   {
                                        "referenceNumber":"+251911314250", 
                                        "message":"Airtime purchase request made successfully",
                                        "responseCode":0, "transactionId":  "", "fee":50.0, 
                                        "currency": "", "exchangeRate": "", "destinationAccountHolderNameAtBank":null
                                    }


 */
this.depositToBank = async (
                referenceNumber, 
                amount, 
                currency, 
                destinationBankUUID, 
                destinationBankAccountNumber, 
                recipientPhoneNumber,
                recipientMobileOperatorCode, 
                recipientEmail, 
                recipientName, 
                alternateSenderName, 
                suppressRecipientMessage, 
                remarks, 
                locale ) => {
       
    var server = (this.test) ? test_server : live_server;

    var obj = {
       "referenceNumber" : referenceNumber,
       "amount" : amount,
       "currency" : currency,
       "destinationBankUUID" : destinationBankUUID,
       "destinationBankAccountNumber" : destinationBankAccountNumber,
       "recipientPhoneNumber" : recipientPhoneNumber,
       "recipientMobileOperatorCode" : recipientMobileOperatorCode,
       "recipientEmail" : recipientEmail,
       "recipientName" : recipientName,
       "alternateSenderName" : alternateSenderName,
       "suppressRecipientMessage" : suppressRecipientMessage,
       "remarks" : remarks,
       "locale" : locale
    }

    var sBuilder = []
    sBuilder.push(referenceNumber + amount + destinationBankUUID + destinationBankAccountNumber + this.hash)
    sBuilder.join("")

    var hashString = this.createHashSHA512(sBuilder.toString(), 1, true).toString();

    var response
    try {
        response = await this.buildRequest(server + service_url + "secured/depositToBank", hashString, obj)
    } catch (error) {
        response = {
            "errorCode" : -1,
            "exception" : error,
        }
    } finally {
        return response;
    }

}



/**
 * @param   {string}    referenceNumber         A unique reference number provided by the business, identifying the transaction. This reference number will be preserved on the Paga platform to reconcile the operation across systems and will be returned in the response.
 * @param   {string}    accountPrincipal        The authentication principal for the user who's balance is being inquired, if the inquiry is being made on behalf of a user. If null, the balance inquiry will be processed from the 3rd parties own account.
 * @param   {string}    accountCredentials      The authentication credentials for the user who's balance is being inquired, if the inquiry is being made on behalf of a user.
 * @param   {string}    sourceOfFunds           The name of a source account on which to check the balance. If null, the Paga account balance with be retrieved.
 * @param   {string}    locale                  The language/locale to be used in messaging. If provided, this must conform to the IETF language tag standard.
 
 * @return {Promise}                            A Promise Object thats receives the response

    Sample Successful Response =>   {
                                        "referenceNumber":"+251911314250", "message":"Airtime purchase request made successfully",
                                        "responseCode":0, ,”totalBalance”:”100.0”,”availableBalance”:50.0,
                                        ”currency”:null,“balanceDateTimeUTC”:null 
                                    }

 */
this.accountBalance = async (
                referenceNumber, 
                accountPrincipal, 
                accountCredentials, 
                sourceOfFunds, 
                locale ) => {
       
    var server = (this.test) ? test_server : live_server;

    var obj = {
       "referenceNumber" : referenceNumber,
       "accountPrincipal" : accountPrincipal,
       "accountCredentials" : accountCredentials,
       "sourceOfFunds" : sourceOfFunds,
       "locale" : locale
    }

    var sBuilder = []
    sBuilder.push(referenceNumber + this.hash)
    sBuilder.join("")

    var hashString = this.createHashSHA512(sBuilder.toString(), 1, true).toString();

    var response
    try {
        response = await this.buildRequest(server + service_url + "secured/accountBalance", hashString, obj)
    } catch (error) {
        response = {
            "errorCode" : -1,
            "exception" : error,
        }
    } finally {
        return response;
    }

}






/**
 * @param   {string}    referenceNumber         A unique reference number provided by the business, identifying the transaction. This reference number will be preserved on the Paga platform to reconcile the operation across systems and will be returned in the response.
 * @param   {string}    accountPrincipal        The authentication principal for the user who's transaction history is being retrieved, if the inquiry is being made on behalf of a user. If null, the balance inquiry will be processed from the 3rd parties own account.
 * @param   {string}    accountCredentials      The authentication credentials for the user who's transaction history is being retrieved, if the inquiry is being made on behalf of a user.
 * @param   {Date}      startDateUTC            The start date of the interval for which transaction history results should be returned. The results are inclusive of this date and it should include hour, minute and second values in addition to the date.
 * @param   {Date}      endDateUTC              The start date of the interval for which transaction history results should be returned. The results are exclusive of this date and it should include hour, minute and second values in addition to the date.
 * @param   {string}    locale                  The language/locale to be used in messaging. If provided, this must conform to the IETF language tag standard.
 
 *@return   {Promise}                           A Promise Object thats receives the response

    Sample Successful Response =>   {
                                        "referenceNumber":"+251911314250", "message":"Airtime purchase request made successfully",
                                        "responseCode":0, "recordCount": 0, 
                                        items: 
                                            [{
                                                "itemNumber": "", "dateUTC": "",
                                                "description": "", "amount": "", "status": "", 
                                                "referenceNumber": "+251911314250", "transactionId": "At34",
                                                "currency":null, "exchangeRate":null 
                                            }], 
                                        "currency": ""
                                    }

 */
this.transactionHistory = async (
                referenceNumber, 
                accountPrincipal, 
                accountCredentials, 
                startDateUTC, 
                endDateUTC, 
                locale ) => {
       
    var server = (this.test) ? test_server : live_server;

    var obj = {
       "referenceNumber" : referenceNumber,
       "accountPrincipal" : accountPrincipal,
       "accountCredentials" : accountCredentials,
       "startDateUTC" : startDateUTC,
       "endDateUTC" : endDateUTC,
       "locale" : locale
    }

    var sBuilder = []
    sBuilder.push(referenceNumber + this.hash)
    sBuilder.join("")

    var hashString = this.createHashSHA512(sBuilder.toString(), 1, true).toString();

    var response
    try {
        response = await this.buildRequest(server + service_url + "secured/transactionHistory", hashString, obj)
    } catch (error) {
        response = {
            "errorCode" : -1,
            "exception" : error,
        }
    } finally {
        return response;
    }

}








/**
 * @param   {string}    referenceNumber         A unique reference number provided by the business, identifying the transaction. This reference number will be preserved on the Paga platform to reconcile the operation across systems and will be returned in the response
 * @param   {string}    accountPrincipal        The authentication principal for the user who's transaction history is being retrieved, if the inquiry is being made on behalf of a user. If null, the balance inquiry will be processed from the 3rd parties own account.
 * @param   {string}    accountCredentials      The authentication credentials for the user who's transaction history is being retrieved, if the inquiry is being made on behalf of a user.
 * @param   {string}    locale                  The language/locale to be used in messaging. If provided, this must conform to the IETF language tag standard
 
 * @return {Promise}                            A Promise Object thats receives the response

    Sample Successful Response =>   {
                                        "referenceNumber":"+251911314250", "message":"Airtime purchase request made successfully",
                                        "responseCode":0, "recordCount": 0, 
                                        items: 
                                            [{
                                                "itemNumber": "", "dateUTC": "", "description": "", "amount": "", 
                                                "status": "", "referenceNumber": "+251911314250", 
                                                "transactionId": "At34","currency":null, "exchangeRate":null 
                                            }], 
                                        "currency": ""
                                    }

 */
this.recentTransactionHistory = async (
                    referenceNumber, 
                    accountPrincipal, 
                    accountCredentials, 
                    locale ) => {
       
    var server = (this.test) ? test_server : live_server;

    var obj = {
       "referenceNumber" : referenceNumber,
       "accountPrincipal" : accountPrincipal,
       "accountCredentials" : accountCredentials,
       "locale" : locale
    }

    var sBuilder = []
    sBuilder.push(referenceNumber + this.hash)
    sBuilder.join("")

    var hashString = this.createHashSHA512(sBuilder.toString(), 1, true).toString();

    var response
    try {
        response = await this.buildRequest(server + service_url + "secured/recentTransactionHistory", hashString, obj)
    } catch (error) {
        response = {
            "errorCode" : -1,
            "exception" : error,
        }
    } finally {
        return response;
    }

}






/**
 * @param   {string}    referenceNumber         A unique reference number provided by the business, identifying the transaction. This reference number will be preserved on the Paga platform to reconcile the operation across systems and will be returned in the response
 * @param   {string}    locale                  The language/locale to be used in messaging. If provided, this must conform to the IETF language tag standard
 
 * @return {Promise}                            A Promise Object thats receives the response

    Sample Successful Response =>   {
                                        "referenceNumber":"+251911314250", "message":"Airtime purchase request made successfully",
                                        "responseCode":0, 
                                        "merchants": 
                                            [{
                                                "name": "", "uuid": "", "id": "", "code": ""
                                            }] 
                                    }

 */
this.getMerchants = async (
                    referenceNumber, 
                    locale ) => {
       
    var server = (this.test) ? test_server : live_server;

    var obj = {
       "referenceNumber" : referenceNumber,
       "locale" : locale
    }

    var sBuilder = []
    sBuilder.push(referenceNumber + this.hash)
    sBuilder.join("")

    var hashString = this.createHashSHA512(sBuilder.toString(), 1, true).toString();

    var response
    try {
        response = await this.buildRequest(server + service_url + "secured/getMerchants", hashString, obj)
    } catch (error) {
        response = {
            "errorCode" : -1,
            "exception" : error,
        }
    } finally {
        return response;
    }

}





/**
 * @param   {string}    referenceNumber         A unique reference number provided by the business, identifying the transaction. This reference number will be preserved on the Paga platform to reconcile the operation across systems and will be returned in the response
 * @param   {string}    merchantId              The identifier which uniquely identifies the merchant on the Paga platform. May be the merchant UUID, id, or code.
 * @param   {string}    locale                  The language/locale to be used in messaging. If provided, this must conform to the IETF language tag standard
 
 * @return {Promise}                            A Promise Object thats receives the response

    Sample Successful Response =>   {
                                        "referenceNumber":"+251911314250", 
                                        "message":"Airtime purchase request made successfully",
                                        "responseCode":0, 
                                        "services": 
                                            [{
                                                "name": "", "price": "", "shortCode": "", "code": ""
                                            }] 
                                    }

 */
this.getMerchantServices = async (
    referenceNumber, 
    merchantPublicId, 
    locale) => {
       
    var server = (this.test) ? test_server : live_server;

    var obj = {
       "referenceNumber" : referenceNumber,
       "merchantPublicId" : merchantPublicId,
       "locale" : locale
    }

    var sBuilder = []
    sBuilder.push(referenceNumber + merchantPublicId + this.hash)
    sBuilder.join("")

    var hashString = this.createHashSHA512(sBuilder.toString(), 1, true).toString();

    var response
    try {
        response = await this.buildRequest(server + service_url + "secured/getMerchantServices", hashString, obj)
    } catch (error) {
        response = {
            "errorCode" : -1,
            "exception" : error,
        }
    } finally {
        return response;
    }

}





/**
 * @param   {string}    referenceNumber         A unique reference number provided by the business, identifying the transaction. This reference number will be preserved on the Paga platform to reconcile the operation across systems and will be returned in the response
 * @param   {string}    locale                  The language/locale to be used in messaging. If provided, this must conform to the IETF language tag standard
 
 * @return {Promise}                            A Promise Object thats receives the response

    Sample Successful Response =>   {
                                        "referenceNumber":"+251911314250", 
                                        "message":"Airtime purchase request made successfully",
                                        "responseCode":0, 
                                        "bank": 
                                            [{"name": "", "uuid": "" }] 
                                    }

 */
this.getBanks = async (
    referenceNumber, 
    locale) => {
       
    var server = (this.test) ? test_server : live_server;

    var obj = {
       "referenceNumber" : referenceNumber,
       "locale" : locale
    }

    var sBuilder = []
    sBuilder.push(referenceNumber + this.hash)
    sBuilder.join("")

    var hashString = this.createHashSHA512(sBuilder.toString(), 1, true).toString();

    var response
    try {
        response = await this.buildRequest(server + service_url + "secured/getBanks", hashString, obj)
    } catch (error) {
        response = {
            "errorCode" : -1,
            "exception" : error,
        }
    } finally {
        return response;
    }

}






/**
 * @param   {string}    referenceNumber         The reference number provided with the original operation for which the status is being queried
 * @param   {string}    locale                  The language/locale to be used in messaging. If provided, this must conform to the IETF language tag standard
 
 * @return {Promise}                            A Promise Object thats receives the response

    Sample Successful Response =>   {
                                        "referenceNumber":"+251911314250", 
                                        "message":"Airtime purchase request made successfully",
                                        "responseCode":0, "transactionId": , "fee": 5.0
                                    }

 */
this.getOperationStatus = async (
    referenceNumber, 
    locale) => {
       
    var server = (this.test) ? test_server : live_server;

    var obj = {
        "referenceNumber" : referenceNumber,
       "locale" : locale
    }

    var sBuilder = []
    sBuilder.push(referenceNumber + this.hash)
    sBuilder.join("")

    var hashString = this.createHashSHA512(sBuilder.toString(), 1, true).toString();

    var response
    try {
        response = await this.buildRequest(server + service_url + "secured/getOperationStatus", hashString, obj)
    } catch (error) {
        response = {
            "errorCode" : -1,
            "exception" : error,
        }
    } finally {
        return response;
    }

}




/**
 * @param   {string}    referenceNumber         A unique reference number provided by the business, identifying the transaction. This reference number will be preserved on the Paga platform to reconcile the operation across systems and will be returned in the response
 * @param   {string}    locale                  The language/locale to be used in messaging. If provided, this must conform to the IETF language tag standard
 
 * @return {Promise}                            A Promise Object thats receives the response

    Sample Successful Response =>   {
                                        "referenceNumber":"+251911314250", 
                                        "message":"Airtime purchase request made successfully",
                                        "responseCode":0, 
                                        "mobileOperator": 
                                            [{"name": "", " mobileOperatorCode ": "" }] 
                                    }

 */
this.getMobileOperators = async (
    referenceNumber, 
    locale ) => {
       
    var server = (this.test) ? test_server : live_server;

    var obj = {
        "referenceNumber" : referenceNumber,
       "locale" : locale
    }

    var sBuilder = []
    sBuilder.push(referenceNumber  + this.hash)
    sBuilder.join("")

    var hashString = this.createHashSHA512(sBuilder.toString(), 1, true).toString();

    var response
    try {
        response = await this.buildRequest(server + service_url + "secured/getMobileOperators", hashString, obj)
    } catch (error) {
        response = {
            "errorCode" : -1,
            "exception" : error,
        }
    } finally {
        return response;
    }

}


/**
 * @param   {Array}    MoneyTransferItem         A list of the money transfer items included in this bulk operation
 * @param   {string}    bulkReferenceNumber A unique bulk reference number provided by the business, identifying the transaction. This reference number will be preserved on the Paga platform to reconcile the operation across systems and will be returned in the response
 
 * @return {Promise}                            A Promise Object thats receives the response
{  
   "bulkReferenceNumber":"1232452525",
   "message":"Successful bulk money transfer. 1 of 1 items successful",
   "results":[  
      {  
         "referenceNumber":"2345",
         "withdrawalCode":null,
         "exchangeRate":null,
         "fee":50,
         "receiverRegistrationStatus":"REGISTERED",
         "currency":"AED",
         "message":"You have successfully sent N3,000.00 to 12345. Paga Txn ID: MSGHB. Thank you for using Paga!",
         "transactionId":"MSGHB",
         "responseCode":0
      }
   ],
   "responseCode":0
}

 */
this.moneyTransferBulk = async ( 
    bulkReferenceNumber,
     moneyTransferItems ) => {
       
    var server = (this.test) ? test_server : live_server;
    var {
        referenceNumber : moneyTransferItemsReferenceNumber,
        amount : moneyTransferItemsAmount,
        destinationAccount : moneyTransferItemsDestinationAccount
    } = moneyTransferItems

    var obj = {
        "bulkReferenceNumber": bulkReferenceNumber,
        moneyTransferItems
    }

    var sBuilder = []
    sBuilder.push(moneyTransferItemsReferenceNumber + moneyTransferItemsAmount + moneyTransferItemsDestinationAccount + obj.moneyTransferItems.length + this.hash)
    sBuilder.join("")

    var hashString = this.createHashSHA512(sBuilder.toString(), 1, true).toString();

    var response
    try {
        response = await this.buildRequest(server + service_url + "secured/moneyTransferBulk", hashString, obj)
    } catch (error) {
        response = {
            "errorCode" : -1,
            "exception" : error,
        }
    } finally {
        return response;
    }

}




/**
 * @param   {string}    reference               A unique reference number provided by the business, identifying the transaction. This reference number will be preserved on the Paga platform to reconcile the operation across systems and will be returned in the response
 * @param   {string}    merchantExternalId      A unique reference number provided by the business, identifying the specific Organization account to be created.
 * @param   {Object}    merchantInfo            Containing information about the Organization to be created. 
 * @param   {Object}    integration             Contains information about the type of notification to be used for notification of received payments.
 * 
 * sample MerchantInfo Object:
 * {
          "legalEntity": {
                "name" : "Example Sub Merchant 1",
                "description": "business",
                "addressLine1": "35 Yabas Road",
                "addressLine2": "Somewhere",
                "addressCity": "Lagos",
                "addressState": "Lagos",
                "addressZip": "xxxx",
                "addressCountry": "Nigeria"
      },
      "legalEntityRepresentative": {
            "firstName": "John",
            "lastName": "Doe",
            "dateOfBirth": "1995-05-02T07:45:37.726+03:00",
            "phone": "+2348188215379",
            "email": "primarycontact@email.com"
      },
        "additionalParameters": {
        "establishedDate": "2014-03-13T19:53:37.726+03:00",
        "websiteUrl": "http://www.example.com",
        "displayName": "Life is Good"
      }
   }
 *
 * @param   {Object}    integration             Contains information about the type of notification to be used for notification of received payments. There are 2 integration types. EMAIL_NOTIFICATION and MERCHANT_NOTIFICATION_REVERSE_API. Each integration type requires a different set of parameters. See The Merchant Notification API Document for more details on the Reverse Notification API. e.g 
 * Sample Integration Object :
 *  {
 *       "type" : "EMAIL_NOTIFICATION",
 *       "financeAdminEmail": "gfinance@apposit.com"
 *  }
 *
 * @return {Promise}                            A Promise Object thats receives the response
 * 
 *      Sample Successful Response =>   {
                                            "responseCode": 0,
                                            "onboardingUpdate": {
                                                "status": "succeeded",
                                                "credentials": {
                                                "merchantPublicId": "XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXXXX",
                                                "merchantSecretKey": "xxxxxxxxxxxxxxxx",
                                                "merchantHmac": "b3c15a3b8xxxxxxxxc06c86e2394xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx0fc374d898aed5a3a86xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx9e67c1c969f1b8"
                                                }
                                            }
                                        }
 * 
 */
this.onboardMerchant = async ( referenceNumber, 
                                merchantExternalId,
                                merchantInfo, 
                                integration ) => {
       
    var server = (this.test) ? test_server : live_server;

    var { name : merchantInfoLegalEntityName } = merchantInfo.legalEntity
    var {
        phone: merchantInfoLegalEntityRepresentativePhone,
        email: merchantInfoLegalEntityRepresentativeEmail  
    } = merchantInfo.legalEntityRepresentative
    var obj = {
        "reference": referenceNumber,
        merchantExternalId,
        merchantInfo,
        integration
    }

    var sBuilder = []
    sBuilder.push(referenceNumber + merchantExternalId + merchantInfoLegalEntityName + merchantInfoLegalEntityRepresentativePhone +
        merchantInfoLegalEntityRepresentativeEmail + this.hash)
    sBuilder.join("")

    var hashString = this.createHashSHA512(sBuilder.toString(), 1, true).toString();

    var response
    try {
        response = await this.buildRequest(server + service_url + "secured/onboardMerchant", hashString, obj)
    } catch (error) {
        response = {
            "errorCode" : -1,
            "exception" : error,
        }
    } finally {
        return response;
    }

}

/**
 * @param   {string}    referenceNumber                       A unique reference number provided by the business, identifying the transaction. This reference number will be preserved on the Paga platform to reconcile the operation across systems and will be returned in the response
 * @param   {string}    merchantReferenceNumber               The Organization public ID for which you want to get customer account details
 * @param   {string}    merchantServiceProductCode            Customer account Number at the Organization
 * @param   {string}    merchantServiceProductCode            Merchant service code specifying which of the merchant's services are being paid for
 * 
 * @return {Promise}                                          A Promise Object thats receives the response

  Sample Successful Response =>  {
                "responseCode":0,
                "message":"Success",
                "customerName":"Mock User",
                "phoneNumber":null,
                "accountNumber":"Mock User",
                "details":{
                    "First Name":"Mock",
                    "details":"Mock User",
                    "Last Name":"User",
                    "customerName":"Mock User",
                    "merchantAccountDetails":"Mock User"
                }
}

 */

this.getMerchantAccountDetails = async (
    referenceNumber, 
    merchantAccount,
    merchantReferenceNumber,
    merchantServiceProductCode 
    ) => {
       
    var server = (this.test) ? test_server : live_server;

    var obj = {
       "referenceNumber" : referenceNumber,
       "merchantAccount" : merchantAccount,
       "merchantReferenceNumber" : merchantReferenceNumber,
       "merchantServiceProductCode":merchantServiceProductCode
    }

    var sBuilder = []
    sBuilder.push(referenceNumber + merchantAccount+ merchantReferenceNumber+ merchantServiceProductCode+ this.hash)
    sBuilder.join("")

    var hashString = this.createHashSHA512(sBuilder.toString(), 1, true).toString();

    var response
    try {
        response = await this.buildRequest(server + service_url + "secured/getMerchantAccountDetails", hashString, obj)
    } catch (error) {
        response = {
            "errorCode" : -1,
            "exception" : error,
        }
    } finally {
        return response;
    }

}

/**
 * @param   {string}    referenceNumber                       A unique reference number provided by the business, identifying the transaction. This reference number will be preserved on the Paga platform to reconcile the operation across systems and will be returned in the response
 * @param   {string}    merchantReferenceNumber               The Organization public ID for which you want to get customer account details
 * @param   {string}    merchantServiceProductCode            Customer account Number at the Organization
 * @param   {string}    merchantServiceProductCode            Merchant service code specifying which of the merchant's services are being paid for
 * 
 * @return {Promise}                                          A Promise Object thats receives the response

  Sample Successful Response =>  {
                "responseCode":0,
                "message":"Success",
                "customerName":"Mock User",
                "phoneNumber":null,
                "accountNumber":"Mock User",
                "details":{
                    "First Name":"Mock",
                    "details":"Mock User",
                    "Last Name":"User",
                    "customerName":"Mock User",
                    "merchantAccountDetails":"Mock User"
                }
}

 */

this.getMerchantAccountDetails = async (
    referenceNumber, 
    merchantAccount,
    merchantReferenceNumber,
    merchantServiceProductCode 
    ) => {
       
    var server = (this.test) ? test_server : live_server;

    var obj = {
       "referenceNumber" : referenceNumber,
       "merchantAccount" : merchantAccount,
       "merchantReferenceNumber" : merchantReferenceNumber,
       "merchantServiceProductCode":merchantServiceProductCode
    }

    var sBuilder = []
    sBuilder.push(referenceNumber + merchantAccount+ merchantReferenceNumber+ merchantServiceProductCode+ this.hash)
    sBuilder.join("")

    var hashString = this.createHashSHA512(sBuilder.toString(), 1, true).toString();

    var response
    try {
        response = await this.buildRequest(server + service_url + "secured/getMerchantAccountDetails", hashString, obj)
    } catch (error) {
        response = {
            "errorCode" : -1,
            "exception" : error,
        }
    } finally {
        return response;
    }

}


}


PagaBusinessClient.Builder = () => {
    class Builder {
        setPrincipal(clientId) {
          this.clientId = clientId;
          return this;
       }
       setCredential(password){
          this.password = password;
          return this;
       }
       setApiKey(apiKey){
          this.apiKey = apiKey;
          return this;
       }
       setIsTest(flag){
          this.test = flag
          return this
       }
       build() {
          return new PagaBusinessClient(this);
       }
    }
    return new Builder();
  }
  

module.exports = PagaBusinessClient