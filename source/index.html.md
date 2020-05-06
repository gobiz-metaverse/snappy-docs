---
title: API Reference

language_tabs: # must be one of https://git.io/vQNgJ
  - http

toc_footers:
  - <a href='#'>Sign Up for a Developer Key</a>
  - <a href='https://github.com/lord/slate'>Documentation Powered by Slate</a>

<!-- includes:
  - errors -->

search: true
---

# Introduction

Welcome to the Snappy API! You can use our API to access Snappy API endpoints, which can get information on various trackings, businesses and payments in our database.

We have language bindings in Http! You can view code examples in the dark area to the right, and you can switch the programming language of the examples with the tabs in the top right.

# General Setting

## Environment

* Production base url: **https://pos.pages.fm/api/v1**


# Authentication

The first you must have a snappy account by access [https://snappy.vn/register](https://snappy.vn/register) or login into our website via [https://snappy.vn/login](https://snappy.vn/login). After that, you can redirect to [https://snappy.vn/businesses](https://snappy.vn/businesses) to show all of your businesses. Then pick one of your favorite business. And finally, you can create Snappy's `access_token` and `callback URL` using for webhook from the API tab.

Snappy expects for the `access_token` to be included in almost API requests to the server as a param that looks like the following:

`Authorization: access_token`

<aside class="notice">
You must replace <code>access_token</code> with your personal access_token.
</aside>

# Geos

## Get Provinces

```http
GET /geo/provinces HTTP/1.1
```

> Response

```json
{
    "data": [
        {
            "id": "101",
            "name": "Hà Nội",
            "name_en": "ha noi"
        },
        {
            "id": "701",
            "name": "Hồ Chí Minh",
            "name_en": "ho chi minh"
        },
        {
            "id": "221",
            "name": "Bắc Giang",
            "name_en": "bac giang"
        },
        {
            "id": "207",
            "name": "Bắc Kạn",
            "name_en": "bac kan"
        },
        {
            "id": "821",
            "name": "Bạc Liêu",
            "name_en": "bac lieu"
        },
        ...
    ]
}
```

This endpoint retrieves all provinces.

### HTTP Request

`GET /geo/provinces`

## Get Districts

```http
GET /geo/districts HTTP/1.1
```

> Response

```json
{
    "data": [
        {
            "id": "10101",
            "name": "Quận Ba Đình",
            "name_en": "ba dinh"
        },
        {
            "id": "10129",
            "name": "Huyện Ba Vì",
            "name_en": "ba vi"
        },
        {
            "id": "10155",
            "name": "Quận Bắc Từ Liêm",
            "name_en": "bac tu liem"
        },
        {
            "id": "10113",
            "name": "Quận Cầu Giấy",
            "name_en": "cau giay"
        },
        {
            "id": "10141",
            "name": "Huyện Chương Mỹ",
            "name_en": "chuong my"
        },
        ...
    ]
}
```

This endpoint retrieves all districts of given province.

### HTTP Request

`GET /geo/districts`

### Query Parameters

Parameter | Required | Type    | Default | Description
--------- | ------- | ------- | ------- | -----------
province_id | true | string | | Province id of districts you want to retrieve. Get province id in api [GET /geo/provinces](#get-provinces)

## Get Communes

```http
GET /geo/communes HTTP/1.1
```

> Response

```json
{
    "data": [
        {
            "id": "1010115",
            "name": "Phường Cống Vị",
            "name_en": "cong vi"
        },
        {
            "id": "1010109",
            "name": "Phường Điện Biên",
            "name_en": "dien bien"
        },
        {
            "id": "1010113",
            "name": "Phường Đội Cấn",
            "name_en": "doi can"
        },
        {
            "id": "1010119",
            "name": "Phường Giảng Võ",
            "name_en": "giang vo"
        },
        {
            "id": "1010111",
            "name": "Phường Kim Mã",
            "name_en": "kim ma"
        },
        ...
    ]
}
```

This endpoint retrieves all communes of given district.

### HTTP Request

`GET /geo/communes`

### Query Parameters

Parameter | Required | Type    | Default | Description
--------- | ------- | ------- | ------- | -----------
district_id | true | string | | District id of communes you want to retrieve. Get district id in api [GET /geo/districts](#get-districts)

# Businesses

## Get All Businesses

```http
GET /snappy/users/me?access_token=<access_token> HTTP/1.1
```

> Response

```json
{
    "businesses": [
        {
            "addresses": [
                {
                    "address": "Số 1 ABC",
                    "commune_id": null,
                    "district_id": "10101",
                    "full_address": "SG1 - Số 1 ABC, Quận Ba Đình, Hà Nội",
                    "id": "82019ce2-088d-4cb1-8e8a-c6255d12ce6c",
                    "is_default": true,
                    "phone_number": "+84937123123",
                    "province_id": "101",
                    "zipcode": null
                }
            ],
            "business_payments": [],
            "id": 63,
            "inserted_at": "2018-04-17T15:07:49",
            "is_default": true,
            "is_owner": true,
            "last_payment_at": null,
            "name": "SG1",
            "owner_id": "14d4a1a1-ea42-4164-805d-e240f2561f71",
            "owner_name": "SG1",
            "packages": [],
            "payment_methods": [],
            "phone_number": "0937123123",
            "remaining_balance": 0,
            "total_balance": 0,
            "tracking_count": 3,
            "unique_name": "S61",
            "updated_at": "2018-04-17T15:14:26"
        }
    ],
    "data": {
        "email": "user37@gmail.com",
        "fb_id": null,
        "id": "14d4a1a1-ea42-4164-805d-e240f2561f71",
        "name": "SG1",
        "phone_number": "+84937123123"
    },
    "me": {
        "fb_id": null,
        "uid": "14d4a1a1-ea42-4164-805d-e240f2561f71"
    },
    "success": true,
    "uid": "14d4a1a1-ea42-4164-805d-e240f2561f71"
}
```

This endpoint retrieves all businesses and basic user info.

### HTTP Request

`GET /snappy/users/me`

### Query Parameters

Parameter | Required | Type    | Default | Description
--------- | ------- | ------- | ------- | -----------
access_token | true | string | | Your personal acess_token

## Get a Specific Business

```http
GET /snappy/businesses/<ID>?access_token=<access_token> HTTP/1.1
```

> Response

```json
{
    "business": {
        "addresses": [
            {
                "address": "Số 1 ABC",
                "commune_id": null,
                "district_id": "10101",
                "full_address": "SG1 - Số 1 ABC, Quận Ba Đình, Hà Nội",
                "id": "82019ce2-088d-4cb1-8e8a-c6255d12ce6c",
                "is_default": true,
                "phone_number": "+84937123123",
                "province_id": "101",
                "zipcode": null
            }
        ],
        "business_payments": [],
        "coupons": [],
        "id": 63,
        "inserted_at": "2018-04-17T15:07:49",
        "is_default": true,
        "is_owner": true,
        "last_payment_at": null,
        "name": "SG1",
        "owner_id": "14d4a1a1-ea42-4164-805d-e240f2561f71",
        "owner_name": "SG1",
        "packages": [],
        "payment_methods": [],
        "phone_number": "0937123123",
        "remaining_balance": 0,
        "total_balance": 0,
        "tracking_count": 3,
        "unique_name": "S61",
        "updated_at": "2018-04-17T15:14:26"
    },
    "success": true
}
```

This endpoint retrieves a specific business.

### HTTP Request

`GET /snappy/businesses/<ID>`

### URL Parameters

Parameter | Required | Type    | Default | Description
--------- | ------- | ------- | ------- | -----------
access_token | true | string | | Your personal acess_token
ID | true | integer | | Id of a business in list businesses. Get in api [GET /user/me](#get-all-businesses)

## Create Business Address

```http
POST /snappy/businesses/address/create?access_token=<access_token> HTTP/1.1
```
> Sample params

```json
{
    "business_id": 63,
    "name": "Kho hàng Thái Hà",
    "phone_number": "0999999999",
    "address": "123 Thái Hà",
    "province_id": "101",
    "district_id": "10109",
    "commune_id": "1010939",
    "is_default": true
}
```

> Response if success

```json
{
    "business": {
        "addresses": [
            {
                "address": "123 Thái Hà",
                "commune_id": "1010101",
                "district_id": "10101",
                "full_address": "Kho hàng Thái Hà - 123 Thái Hà Phường Láng Hạ, Quận Đống Đa, Hà Nội",
                "id": "6c5d5327-5e1d-4a01-9022-d4f3c5fa229e",
                "is_default": true,
                "phone_number": "+84999999999",
                "province_id": "101",
                "zipcode": null
            }
        ],
        "business_payments": [],
        "hotlines": null,
        "id": 63,
        "inserted_at": "2018-03-17T15:07:49",
        "is_default": true,
        "is_owner": true,
        "last_payment_at": "2018-04-19T15:34:27",
        "name": "SG1",
        "owner_id": "14d4a1a1-ea42-4164-805d-e240f2561f71",
        "owner_name": "SG1",
        "packages": [],
        "payment_methods": [],
        "phone_number": "0888888888",
        "tracking_count": 6,
        "unique_name": "S63",
        "updated_at": "2018-12-10T10:28:12"
    },
    "message": "Bạn đã tạo kho hàng mới thành công",
    "success": true
}
```

This endpoint create an address into your business.

### HTTP Request

`POST /snappy/businesses/address/create`

### URL Parameters

Parameter | Required | Type    | Default | Description
--------- | ------- | ------- | ------- | -----------
access_token | true | string | | Your personal acess_token
business_id | true | integer | | Id of a business in list businesses. Get in api [GET /user/me](#get-all-businesses)
name | true | string | | Name of business address
phone_number | true | string | | Phone number of business address
address | true | string | | Address of business address
province_id | true | string | | Id of business address's province. Get in api [GET /geo/provinces](#get-provinces)
district_id | true | string | | Id of business address's district. Get in api [GET /geo/districts](#get-districts)
commune_id | false | string | | Id of business address's commune. Get in api [GET /geo/communes](#get-communes)
is_default | false | boolean | false | If `true` this business address will set to default business address

## Update Business Address

```http
POST /snappy/businesses/address/update?access_token=<access_token> HTTP/1.1
```
> Sample params

```json
{
    "business_address_id": "27d22b0e-0153-4830-8632-38645ab2a642",
    "business_id": 63,
    "name": "Kho hàng Thái Hà",
    "phone_number": "0999999999",
    "address": "123 Thái Hà",
    "province_id": "101",
    "district_id": "10109",
    "commune_id": "1010939",
    "is_default": true
}
```

> Response if success

```json
{
    "business": {
        "addresses": [
            {
                "address": "123 Thái Hà",
                "commune_id": "1010101",
                "district_id": "10101",
                "full_address": "Kho hàng Thái Hà - 123 Thái Hà Phường Láng Hạ, Quận Đống Đa, Hà Nội",
                "id": "6c5d5327-5e1d-4a01-9022-d4f3c5fa229e",
                "is_default": true,
                "phone_number": "+84999999999",
                "province_id": "101",
                "zipcode": null
            }
        ],
        "business_payments": [],
        "hotlines": null,
        "id": 63,
        "inserted_at": "2018-03-17T15:07:49",
        "is_default": true,
        "is_owner": true,
        "last_payment_at": "2018-04-19T15:34:27",
        "name": "SG1",
        "owner_id": "14d4a1a1-ea42-4164-805d-e240f2561f71",
        "owner_name": "SG1",
        "packages": [],
        "payment_methods": [],
        "phone_number": "0888888888",
        "tracking_count": 6,
        "unique_name": "S63",
        "updated_at": "2018-12-10T10:28:12"
    },
    "message": "Bạn đã cập nhật kho hàng thành công",
    "success": true
}
```

This endpoint update an address into your business.

### HTTP Request

`POST /snappy/businesses/address/update`

### URL Parameters

Parameter | Required | Type    | Default | Description
--------- | ------- | ------- | ------- | -----------
access_token | true | string | | Your personal acess_token
business_id | true | integer | | Id of a business in list businesses. Get in api [GET /user/me](#get-all-businesses)
business_address_id | true | string | | Id `UUID` of one of business address. Get in api [GET /businesses/<ID>](#get-a-specific-business)
name | true | string | | Name of business address
phone_number | true | string | | Phone number of business address
address | true | string | | Address of business address
province_id | true | string | | Id of business address's province. Get in api [GET /geo/provinces](#get-provinces)
district_id | true | string | | Id of business address's district. Get in api [GET /geo/districts](#get-districts)
commune_id | false | string | | Id of business address's commune. Get in api [GET /geo/communes](#get-communes)
is_default | false | boolean | false | If `true` this business address will set to default business address

# Trackings

## Get Trackings

```http
GET /snappy/trackings?access_token=<access_token> HTTP/1.1
```

> Response

```json
{
    "success": true,
    "trackings_data": {
        "page_number": 1,
        "page_size": 50,
        "total_entries": 1,
        "total_pages": 1,
        "trackings": [
            {
                "addition_services": [],
                "balance_adjustment": 0,
                "business": {
                    "id": 63,
                    "name": "SG1",
                    "owner": {
                        "fb_id": null,
                        "name": "SG1"
                    },
                    "phone_number": "+84937123123"
                },
                "business_id": 63,
                "creator": {
                    "fb_id": null,
                    "name": "SG1"
                },
                "creator_id": "14d4a1a1-ea42-4164-805d-e240f2561f71",
                "current_status": "Đã khởi tạo",
                "current_status_en": "request_received",
                "custom_id": "S61180417003",
                "customer_tracking_id": null,
                "department": {
                    "address": "127/19 Hoàng Hoa Thám, Phường 13, Tân Bình",
                    "district_name": "Quận Tân Bình",
                    "phone_number": "0886.332.882",
                    "province_name": "Hồ Chí Minh",
                    "second_phone_number": "0886.334.884"
                },
                "from": {
                    "address": "Số 1 ABC",
                    "commune_id": null,
                    "district_id": "10101",
                    "full_address": "SG1 - Số 1 ABC, Quận Ba Đình, Hà Nội",
                    "id": "82019ce2-088d-4cb1-8e8a-c6255d12ce6c",
                    "name": "SG1",
                    "phone_number": "+84937123123",
                    "province_id": "101"
                },
                "id": "E80008124",
                "inserted_at": "2018-04-17T16:55:03",
                "last_update": {
                    "location": "SG1 - Số 1 ABC, Quận Ba Đình, Hà Nội",
                    "note": "Khởi tạo vận đơn",
                    "status": "Đã khởi tạo",
                    "status_color": "#AD7E05",
                    "updated_at": "2018-04-18T09:21:40"
                },
                "logs": [],
                "package_info": {
                    "items": [
                        {
                            "name": "sp 1",
                            "quantity": 2,
                            "selected": "false",
                            "weight": 100
                        },
                        {
                            "name": "sp 2",
                            "quantity": 1,
                            "weight": 200
                        }
                    ],
                    "snippet": "2 x 100g sp 1, 1 x 200g sp 2",
                    "total_weight": 400
                },
                "services": {
                    "cod_service": {
                        "amount": 500000,
                        "cost": 0,
                        "is_save_log_cod": false,
                        "use_cod": true
                    },
                    "insurance_cost": 0,
                    "is_allow_checking_good": false,
                    "is_allow_try_out": false,
                    "is_receiver_pay": false,
                    "is_save_log_insurance_cost": false,
                    "is_save_log_return": false,
                    "is_save_log_shipping_cost": false,
                    "is_save_log_shipping_cost_of_shop": false,
                    "name": "expedited",
                    "name_vi": "Chuyển phát nhanh",
                    "shipping_cost": 30000,
                    "shipping_cost_of_shop": 0
                },
                "short_id": 812,
                "status_color": "#AD7E05",
                "to": {
                    "address": "12 test",
                    "commune_id": "7010101",
                    "district_id": "70101",
                    "full_address": "Phường Tân Định, Quận 1, Hồ Chí Minh",
                    "id": null,
                    "name": "test",
                    "phone_number": "095555555",
                    "province_id": "701"
                },
                "updated_at": "2018-04-18T09:21:40",
                "updates": [
                    {
                        "location": "SG1 - Số 1 ABC, Quận Ba Đình, Hà Nội",
                        "note": "Khởi tạo vận đơn",
                        "status": "Đã khởi tạo",
                        "status_color": "#AD7E05",
                        "updated_at": "2018-04-18T09:21:40"
                    }
                ]
            }
        ]
    }
}
```

This endpoint retrieves all trackings into your business.

### HTTP Request

`GET /snappy/trackings`

### Query Parameters

Parameter | Required | Type    | Default | Description
--------- | ------- | ------- | ------- | -----------
access_token | true | string | | Your personal acess_token
business_id | true | integer | | Id one business in list businesses you get in api [GET /user/me](#get-all-businesses)
page | false | integer | 1 | Page number
start_date | false | integer | | Start date `timestamp`
end_date | false | integer | | End date `timestamp`
sort_by | false | string | inserted_at | If `sort_by`= `"updated_at"` trackings will sort by `updated_at` instead of default sort by `inserted_at`
filter_by_status | false | string | | One or more status of trackings separate by `,`
filter_inner_outer | false | integer | | `1` is inner, `2` is outer in same province and `3` is outer
creator_id | false | string | | id of creator `UUID`
keyword | false | string | | keyword for search by address, phone number, tracking id, ...

## Create tracking

```http
POST /snappy/trackings/create?access_token=<access_token> HTTP/1.1
Content-Type: application/json
```

> Sample params

```json
{
    "access_token": "eyJ1aWQiOiIxNGQ0YTFhMS1lYTQyLTQxNjQtODA1ZC1lMjQwZjI1NjFmNzEiLCJpYXQiOj",
    "business_id": 63,
    "business_address_id": "82019ce2-088d-4cb1-8e8a-c6255d12ce6c",
    "receiver_name": "test",
    "receiver_phone_number": "0955555555",
    "receiver_address": "12 test",
    "receiver_province_id": "701",
    "receiver_district_id": "70101",
    "receiver_commune_id": "7010101",
    "items": [
        {
            "name": "sp 1",
            "weight": 100,
            "quantity": 1
        },
        {
            "name": "sp 2",
            "weight": 200,
            "quantity": 2
        }
    ],
    "cod": 500000,
    "value" : 600000
}
```

> Response if success

```json
{
    "message": "Vận đơn đã được khởi tạo thành công",
    "success": true,
    "tracking": {
        "addition_services": [],
        "balance_adjustment": 0,
        "business": {
            "id": 63,
            "name": "SG1",
            "owner": {
                "fb_id": null,
                "name": "SG1"
            },
            "phone_number": "+84937123123"
        },
        "business_id": 63,
        "creator": {
            "fb_id": null,
            "name": "SG1"
        },
        "creator_id": "14d4a1a1-ea42-4164-805d-e240f2561f71",
        "current_status": "Đã khởi tạo",
        "current_status_en": "request_received",
        "custom_id": "S61180418001",
        "customer_tracking_id": null,
        "department": {
            "address": "127/19 Hoàng Hoa Thám, Phường 13, Tân Bình",
            "district_name": "Quận Tân Bình",
            "phone_number": "0886.332.882",
            "province_name": "Hồ Chí Minh",
            "second_phone_number": "0886.334.884"
        },
        "from": {
            "address": "Số 1 ABC",
            "commune_id": null,
            "district_id": "10101",
            "full_address": "SG1 - Số 1 ABC, Quận Ba Đình, Hà Nội",
            "id": "82019ce2-088d-4cb1-8e8a-c6255d12ce6c",
            "name": "SG1",
            "phone_number": "+84937123123",
            "province_id": "101"
        },
        "id": "E80008142",
        "inserted_at": "2018-04-18T15:42:56",
        "last_update": {
            "location": "SG1 - Số 1 ABC, Quận Ba Đình, Hà Nội",
            "note": "Khởi tạo vận đơn",
            "status": "Đã khởi tạo",
            "status_color": "#AD7E05",
            "updated_at": "2018-04-18T15:42:56"
        },
        "logs": [],
        "package_info": {
            "items": [
                {
                    "name": "sp 1",
                    "quantity": 2,
                    "weight": 100
                }
            ],
            "snippet": "2 x 100g sp 1",
            "total_weight": 200,
            "value": 600000
        },
        "services": {
            "cod_service": {
                "amount": 500000,
                "cost": 0,
                "is_save_log_cod": false,
                "use_cod": true
            },
            "insurance_cost": 0,
            "is_allow_checking_good": false,
            "is_allow_try_out": false,
            "is_receiver_pay": false,
            "is_save_log_insurance_cost": false,
            "is_save_log_return": false,
            "is_save_log_shipping_cost": false,
            "is_save_log_shipping_cost_of_shop": false,
            "name": "expedited",
            "name_vi": "Chuyển phát nhanh",
            "shipping_cost": 30000,
            "shipping_cost_of_shop": 0
        },
        "short_id": 814,
        "status_color": "#AD7E05",
        "to": {
            "address": "12 test",
            "commune_id": "7010101",
            "district_id": "70101",
            "full_address": "Phường Tân Định, Quận 1, Hồ Chí Minh",
            "id": null,
            "name": "test",
            "phone_number": "095555555",
            "province_id": "701"
        },
        "updated_at": "2018-04-18T15:42:56",
        "updates": [
            {
                "location": "SG1 - Số 1 ABC, Quận Ba Đình, Hà Nội",
                "note": "Khởi tạo vận đơn",
                "status": "Đã khởi tạo",
                "status_color": "#AD7E05",
                "updated_at": "2018-04-18T15:42:56"
            }
        ]
    }
}
```

This endpoint create a tracking into your business.

### HTTP Request

`POST /snappy/trackings/create`

### Query Parameters

Parameter | Required | Type    | Default | Description
--------- | ------- | ------- | ------- | -----------
access_token | true | string | | Your personal acess_token
business_id | true | integer | | Id of a business in list businesses. Get in api [GET /user/me](#get-all-businesses)
business_address_id | true | string | | Id `UUID` of one of business address. Get in api [GET /businesses/<ID>](#get-a-specific-business)
receiver_name | true | string | | Name of receiver
receiver_phone_number | true | string | | Phone number of receiver
receiver_address | true | string | | Address of receiver
receiver_province_id | true | string | | Id of receiver's province. Get in api [GET /geo/provinces](#get-provinces)
receiver_district_id | true | string | | Id of receiver's district. Get in api [GET /geo/districts](#get-districts)
receiver_commune_id | false | string | | Id of receiver's commune. Get in api [GET /geo/communes](#get-communes)
items | true | array | | List of items in tracking package
service_name | false | string | | Name of service. Get in api [GET /snappy/trackings/get_services](#get-services)
cod | false | integer | | Amount of cod or values of all items in package
value | false | integer | | Insurance premium value, which is the basis for calculating insurance premiums and compensation when an incident occurs
note | false | string | `Khởi tạo vận đơn` | Note of each status in tracking
customer_tracking_id | false | string |  | The custom id of customer
is_receiver_pay | false | boolean | false | If `true` all cost of the tracking will be paid by the receiver
is_allow_checking_good | false | boolean | false | If `true` means to allow the receiver to see the product
is_allow_try_out | false | boolean | false | If `true` means to allow the receiver to try the product

Params `items`

Parameter | Required | Type    | Default | Description
--------- | ------- | ------- | ------- | -----------
name | true | string | | Name of item or product
weight | true | integer | | Weight of item or product
quantity | true | integer | | Quantity of item or product

## Calculate shipping cost

```http
POST /snappy/trackings/cal_shipping_cost HTTP/1.1
Content-Type: application/json
```

> Sample params

```json
{
    "business_id": 37,
    "sender_district_id": "10101",
    "receiver_district_id": "10109",
    "receiver_commune_id": "1010901",
    "cod": 1000000,
    "value": 1000000,
    "total_weight": 100,
    "is_receiver_pay": false
}
```

> Response if success

```json
{
    "cod_cost": 0,
    "discount": null,
    "insurance_cost": 0,
    "shipping_cost": 20000,
    "success": true
}
```

This endpoint calculate all cost of a tracking.

### HTTP Request

`POST /snappy/trackings/cal_shipping_cost`

### Query Parameters

Parameter | Required | Type    | Default | Description
--------- | ------- | ------- | ------- | -----------
business_id | true | integer | | Id of a business in list businesses. Get in api [GET /user/me](#get-all-businesses)
sender_district_id | true | string | | Id of sender's district. Get in api [GET /geo/districts](#get-districts)
receiver_district_id | true | string | | Id of receiver's district. Get in api [GET /geo/districts](#get-districts)
receiver_commune_id | false | string | | Id of receiver's commune. Get in api [GET /geo/communes](#get-communes)
cod | false | integer | 0 | Amount of cod
value | false | integer | 0 | Value of all products using for calculate insurance fee
total_weight | false | integer | 0 | Total weight of all products (gram)
is_receiver_pay | false | boolean | false | If `true` all cost of the tracking will be paid by the receiver

## Cancel tracking

```http
DELETE /snappy/trackings/cancel?access_token=<access_token> HTTP/1.1
Content-Type: application/json
```

> Sample params

```json
{
    "access_token": "eyJ1aWQiOiIxNGQ0YTFhMS1lYTQyLTQxNjQtODA1ZC1lMjQwZjI1NjFmNzEiLCJpYXQiOj",
    "tracking_id": "S20010326",
    "note": "Lý do hủy vận đơn"
}
```

> Response if success

```json
{
    "message": "Cập nhật trạng thái vận đơn thành công",
    "success": true,
    "tracking": {
        "addition_services": [],
        "balance_adjustment": -20000,
        "business": {
            "id": 1,
            "name": "Snappy",
            "owner": {
                "fb_id": null,
                "name": "Hoàng Sơn"
            },
            "phone_number": "+84999999999"
        },
        "business_id": 1,
        "creator": {
            "fb_id": null,
            "name": "user4",
            "phone_number": "+84904123123"
        },
        "creator_id": "132abd0a-73b0-4b22-9934-68bb6ef0df36",
        "current_status": "Đã hủy",
        "current_status_en": "canceled",
        "custom_id": "S01181207001",
        "customer_tracking_id": null,
        "department": {
            "address": "Số 33 Tô Vĩnh Diện",
            "district_name": "Quận Thanh Xuân",
            "name": "HN",
            "phone_number": "02420.233.555",
            "province_name": "Hà Nội",
            "second_phone_number": "02421.233.555"
        },
        "from": {
            "address": "Luffy",
            "commune_id": "1010111",
            "district_id": "10101",
            "full_address": "ABC - Luffy Phường Kim Mã, Quận Ba Đình, Hà Nội",
            "id": "11ac8617-a5fa-4f3a-a1ab-6e2de6c7c8cc",
            "name": "ABC",
            "phone_number": "+84999999999",
            "province_id": "101"
        },
        "full_pos_id": null,
        "id": "S20010326",
        "inserted_at": "2018-12-07T12:16:26",
        "last_update": {
            "last_updated_at": "2019-02-13T17:56:28",
            "location": null,
            "note": "asndaslnda",
            "status": "Đã hủy",
            "status_color": "#DB3E36",
            "updated_at": "2019-02-13T17:56:28"
        },
        "logs": [],
        "package_info": {
            "items": [
                {
                    "id": "40",
                    "name": "test",
                    "quantity": 2,
                    "retail_price": 0,
                    "selected": false,
                    "weight": 2000
                }
            ],
            "snippet": "2 x 2kg test",
            "total_weight": 4000
        },
        "services": {
            "cod_service": {
                "amount": 0,
                "cost": 0,
                "is_save_log_cod": true,
                "use_cod": false
            },
            "insurance_cost": 0,
            "is_allow_checking_good": false,
            "is_allow_try_out": false,
            "is_receiver_pay": false,
            "is_save_log_insurance_cost": false,
            "is_save_log_return": false,
            "is_save_log_shipping_cost": true,
            "is_save_log_shipping_cost_of_shop": false,
            "name": "same_day",
            "name_vi": "Trong ngày",
            "shipping_cost": 20000,
            "shipping_cost_of_shop": 0
        },
        "short_id": 1032,
        "status_color": "#DB3E36",
        "to": {
            "address": "test",
            "commune_id": null,
            "district_id": "10107",
            "full_address": "test - Quận Hai Bà Trưng, Hà Nội",
            "id": null,
            "name": "test",
            "phone_number": "0999999999",
            "province_id": "101"
        },
        "updated_at": "2019-02-13T17:56:28",
        "updates": [
            {
                "last_updated_at": "2018-12-07T12:16:26",
                "location": "ABC - Luffy Phường Kim Mã, Quận Ba Đình, Hà Nội",
                "note": "Khởi tạo vận đơn",
                "status": "Đã khởi tạo",
                "status_color": "#AD7E05",
                "updated_at": "2018-12-07T12:16:26"
            },
            {
                "last_updated_at": "2019-02-13T17:56:28",
                "location": null,
                "note": "asndaslnda",
                "status": "Đã hủy",
                "status_color": "#DB3E36",
                "updated_at": "2019-02-13T17:56:28"
            }
        ]
    }
}
```

This endpoint cancel a tracking into your business.

### HTTP Request

`DELETE /snappy/trackings/cancel`

### Query Parameters

Parameter | Required | Type    | Default | Description
--------- | ------- | ------- | ------- | -----------
access_token | true | string | | Your personal acess_token
tracking_id | true | string | | Unique id of tracking
note | true | string | `Hủy vận đơn` | Note of status canceled

## Tracking Status

Name | Vn Name | Color code | Description
-----| ------- | ---------- | ---------------
`request_received` | `Đã khởi tạo` | `#AD7E05` | Vn Name is `current_status` and Name is `current_status_en` of api [GET /snappy/trackings](#get-trackings)
`processing_picked_up` | `Đang lấy hàng` | `#039BE5` | Vn Name is `current_status` and Name is `current_status_en` of api [GET /snappy/trackings](#get-trackings)
`picked_up_fail` | `K.lấy được hàng` | `#C62828` | Vn Name is `current_status` and Name is `current_status_en` of api [GET /snappy/trackings](#get-trackings)
`picked_up` | `Đã nhận hàng` | `#277790` | Vn Name is `current_status` and Name is `current_status_en` of api [GET /snappy/trackings](#get-trackings)
`processing_on_the_way` | `Đang giao kho` | `#9C27B0` | Vn Name is `current_status` and Name is `current_status_en` of api [GET /snappy/trackings](#get-trackings)
`on_the_way` | `Giao kho` | `#129797` | Vn Name is `current_status` and Name is `current_status_en` of api [GET /snappy/trackings](#get-trackings)
`out_for_delivery` | `Đang giao hàng` | `#0063B8` | Vn Name is `current_status` and Name is `current_status_en` of api [GET /snappy/trackings](#get-trackings)
`part_delivery` | `Giao một phần` | `#4CAF50` | Vn Name is `current_status` and Name is `current_status_en` of api [GET /snappy/trackings](#get-trackings)
`delivered` | `Phát thành công` | `#639026` | Vn Name is `current_status` and Name is `current_status_en` of api [GET /snappy/trackings](#get-trackings)
`undeliverable` | `Giao không thành` | `#DB3E36` | Vn Name is `current_status` and Name is `current_status_en` of api [GET /snappy/trackings](#get-trackings)
`waiting_for_return` | `Chờ hoàn` | `#FF4081` | Vn Name is `current_status` and Name is `current_status_en` of api [GET /snappy/trackings](#get-trackings)
`returning` | `Đang hoàn` | `#51ACC7` | Vn Name is `current_status` and Name is `current_status_en` of api [GET /snappy/trackings](#get-trackings)
`returned` | `Đã hoàn` | `#FF4500` | Vn Name is `current_status` and Name is `current_status_en` of api [GET /snappy/trackings](#get-trackings)
`canceled` | `Đã hủy` | `#DB3E36` | Vn Name is `current_status` and Name is `current_status_en` of api [GET /snappy/trackings](#get-trackings)

## Tracking Print

This is special part. With this api you must be redirect or open new tab in your browser and apply this link `https://snappy.vn/print/<ids>&business_id=<business_id>&access_token=<access_token>`

Parameter | Required | Type | Description
--------- | ------- | ------- | ------- | -----------
ids | true | string | ids of trackings need to print separate by comma `,` eg. S20010048,S20009784,S20010275
business_id | true | integer | | Id of a business in list businesses. Get in api [GET /user/me](#get-all-businesses)
access_token | true | string | | Your personal acess_token

# Webhook

> Sample params send to callback url

```json
{
    "addition_services": [],
    "balance_adjustment": 0,
    "business": {
        "id": 63,
        "name": "SG1",
        "owner": {
            "fb_id": null,
            "name": "SG1"
        },
        "phone_number": "+84937123123"
    },
    "business_id": 63,
    "creator": {
        "fb_id": null,
        "name": "SG1"
    },
    "creator_id": "14d4a1a1-ea42-4164-805d-e240f2561f71",
    "current_status": "Đã khởi tạo",
    "current_status_en": "request_received",
    "custom_id": "S61180418001",
    "customer_tracking_id": null,
    "department": {
        "address": "127/19 Hoàng Hoa Thám, Phường 13, Tân Bình",
        "district_name": "Quận Tân Bình",
        "phone_number": "0886.332.882",
        "province_name": "Hồ Chí Minh",
        "second_phone_number": "0886.334.884"
    },
    "from": {
        "address": "Số 1 ABC",
        "commune_id": null,
        "district_id": "10101",
        "full_address": "SG1 - Số 1 ABC, Quận Ba Đình, Hà Nội",
        "id": "82019ce2-088d-4cb1-8e8a-c6255d12ce6c",
        "name": "SG1",
        "phone_number": "+84937123123",
        "province_id": "101"
    },
    "id": "E80008142",
    "inserted_at": "2018-04-18T15:42:56",
    "last_update": {
        "location": "SG1 - Số 1 ABC, Quận Ba Đình, Hà Nội",
        "note": "Khởi tạo vận đơn",
        "status": "Đã khởi tạo",
        "status_color": "#AD7E05",
        "updated_at": "2018-04-18T15:42:56"
    },
    "logs": [],
    "package_info": {
        "items": [
            {
                "name": "sp 1",
                "quantity": 2,
                "weight": 100
            }
        ],
        "snippet": "2 x 100g sp 1",
        "total_weight": 200
    },
    "services": {
        "cod_service": {
            "amount": 500000,
            "cost": 0,
            "is_save_log_cod": false,
            "use_cod": true
        },
        "insurance_cost": 0,
        "is_allow_checking_good": false,
        "is_allow_try_out": false,
        "is_receiver_pay": false,
        "is_save_log_insurance_cost": false,
        "is_save_log_return": false,
        "is_save_log_shipping_cost": false,
        "is_save_log_shipping_cost_of_shop": false,
        "name": "expedited",
        "name_vi": "Chuyển phát nhanh",
        "shipping_cost": 30000,
        "shipping_cost_of_shop": 0
    },
    "short_id": 814,
    "status_color": "#AD7E05",
    "to": {
        "address": "12 test",
        "commune_id": "7010101",
        "district_id": "70101",
        "full_address": "Phường Tân Định, Quận 1, Hồ Chí Minh",
        "id": null,
        "name": "test",
        "phone_number": "095555555",
        "province_id": "701"
    },
    "updated_at": "2018-04-18T15:42:56",
    "updates": [
        {
            "location": "SG1 - Số 1 ABC, Quận Ba Đình, Hà Nội",
            "note": "Khởi tạo vận đơn",
            "status": "Đã khởi tạo",
            "status_color": "#AD7E05",
            "updated_at": "2018-04-18T15:42:56"
        }
    ]
}
```

When tracking update status to another status, Snappy will send a POST request following the callback url created in api [POST /snappy/trackings/webhook](#create-webhook). Max retry of the request with each tracking status to callback url is 10 times. List tracking status [Tracking Status](#tracking-status). The body of POST request sent to callback url similar to `tracking` field response from api [POST /snappy/trackings/create](#create-tracking)

## Create Webhook

```http
POST /snappy/trackings/webhook?access_token=<access_token> HTTP/1.1
```
> Sample params

```json
{
    "access_token": "eyJ1aWQiOiIxNGQ0YTFhMS1lYTQyLTQxNjQtODA1ZC1lMjQwZjI1NjFmNzEiLCJpYXQiOj",
    "business_id": 1,
    "callback_url": "https://postman-echo.com/post"
}
```

> Response if success

```json
{
    "success": true,
    "webhook": {
        "business_id": 1,
        "callback_url": "https://postman-echo.com/post"
    }
}
```

This endpoint create an unique webhook callback url into your business.

### HTTP Request

`POST /snappy/trackings/webhook`

### URL Parameters

Parameter | Required | Type    | Default | Description
--------- | ------- | ------- | ------- | -----------
access_token | true | string | | Your personal acess_token
business_id | true | integer | | Id of a business in list businesses. Get in api [GET /user/me](#get-all-businesses)
callback_url | true | string | | The endpoint Snappy will send POST request

## Get a Specific Webhook

```http
GET /snappy/trackings/webhook?business_id=<business_id>&access_token=<access_token> HTTP/1.1
```

> Response

```json
{
    "success": true,
    "webhook": {
        "business_id": 1,
        "callback_url": "https://postman-echo.com/post"
    }
}
```

This endpoint retrieves a specific webhook callback url into your specific business.

### HTTP Request

`GET /snappy/trackings/webhook`

### URL Parameters

Parameter | Required | Type    | Default | Description
--------- | ------- | ------- | ------- | -----------
access_token | true | string | | Your personal acess_token
business_id | true | integer | | Id of a business in list businesses. Get in api [GET /user/me](#get-all-businesses)