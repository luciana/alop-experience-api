/**
 Provide Api for Home

    Product Identifier model - returns observables

**/


'use strict'
require('rxjs/Rx');
const Observable = require('rxjs/Observable').Observable;
const ALL_PRODUCT_IDENTIFIERS_FROM_APPSTORE = '[{"product_id":"com.mypilatespal.MPPApp.subscription.all.access.monthly", "reference_name": "ALOP Subscription Monthly", "status": "active", "subscription_group_display_name":"ALOP_Subscriptions"},{"product_id":"com.mypilatespal.MPPApp.subscription.all.access.annually", "reference_name": "ALOP Subscription Annually", "status": "active", "subscription_group_display_name":"ALOP_Subscriptions"}]';
let productIdentifier = {};


productIdentifier.getList$ = () =>{
    let results = {};		
    results.availableProductIdenfitiers = JSON.parse(ALL_PRODUCT_IDENTIFIERS_FROM_APPSTORE);
    return 	Observable.of(results);
};



module.exports = productIdentifier;
