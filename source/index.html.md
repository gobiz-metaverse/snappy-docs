---
title: Snappy Express API Reference

language_tabs: # must be one of https://git.io/vQNgJ
  - http

toc_footers:
  - <a href='#'>Sign Up for a Developer Key</a>
  - <a href='https://github.com/slatedocs/slate'>Documentation Powered by Slate</a>

<!-- includes:
  - errors -->

search: true

code_clipboard: true

meta:
  - name: description
    content: Documentation for the Snappy Express API
---

# Introduction

Welcome to the Snappy API! You can use our API to access Snappy API endpoints, which can get information on various trackings, businesses and payments in our database.

We have language bindings in Http and you can view code examples in the dark area to the right.

# General Setting

## Environment

* Production base url: **https://pos.pages.fm/api/v1**

# Authentication

The first you must have a snappy account by access [https://snappy.vn/register](https://snappy.vn/register) or login into our website via [https://snappy.vn/login](https://snappy.vn/login). After that, you can redirect to [https://snappy.vn/businesses](https://snappy.vn/businesses) to show all of your businesses. Then pick one specific business you want to connect api. And finally, you can manage Snappy's `access_token` and `callback URL` using for webhook from the API tab.

Snappy expects for the `access_token` to be included in almost API requests to the server as a param that looks like the following:

`Authorization: access_token`

<aside class="notice">
You must replace <code>access_token</code> with your personal access_token.
</aside>

## Login

```http
POST /snappy/users/login/password HTTP/1.1
Content-Type: application/json
```

> Sample params

```json
{
    "phone_number": "0908123123",
    "email": "user08@gmail.com",
    "password": "usertest",
    "affiliate_id": "abc"
}
```

> Response if success

```json
{
    "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
    "businesses": [
        {
            "circulating_cod": 0,
            "circulating_cost": 0,
            "coupons": [],
            "delivered_balance": {
                "sum_cod_amount": 0,
                "sum_total_cost": 0,
                "total": 0
            },
            "hotlines": null,
            "id": 9,
            "inserted_at": "2021-04-09T09:16:13",
            "is_default": true,
            "is_owner": true,
            "is_removed": false,
            "last_payment_at": null,
            "name": "user08",
            "owner": {
                "avatar_url": null,
                "email": "user08@gmail.com",
                "fb_id": null,
                "id": "cff10be4-3966-45b6-b156-a1a01000a6f9",
                "is_admin": false,
                "name": "user08",
                "permission": 1,
                "phone_number": "+84908123123",
                "role": "Khách hàng",
                "signatures": null
            },
            "owner_id": "cff10be4-3966-45b6-b156-a1a01000a6f9",
            "payment_methods": [],
            "pending_balance": {
                "sum_cod_amount": 0,
                "sum_total_cost": 0,
                "total": 0
            },
            "phone_number": "0908123123",
            "ref": null,
            "secret_key": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
            "settings": {},
            "sny_settings": {
                "auto_assign_shipper": true,
                "auto_payment": true,
                "auto_payment_dows": "3,5",
                "auto_payment_hour": "10h",
                "return_cost_percentage": 50
            },
            "total_balance": 0,
            "total_payment_amount": 0,
            "tracking_count": 0,
            "unique_name": "S09"
        }
    ],
    "data": {
        "avatar_url": null,
        "email": "user08@gmail.com",
        "fb_id": null,
        "id": "cff10be4-3966-45b6-b156-a1a01000a6f9",
        "is_admin": false,
        "name": "user08",
        "permission": 1,
        "phone_number": "+84908123123",
        "role": "Khách hàng",
        "signatures": null
    },
    "message": "Bạn đã đăng nhập thành công",
    "name": "user08",
    "permission": 1,
    "success": true,
    "uid": "cff10be4-3966-45b6-b156-a1a01000a6f9"
}
```

### HTTP Request

`POST /snappy/users/login/password`

### Parameters

Parameter | Required | Type    | Default | Description
--------- | ------- | ------- | ------- | -----------
email | true | string | | Email of user
phone_number | true | string | | Phone_number of user
password | true | string | | Password of user
affiliate_id | false | string | | affiliate_id of user

## Get long term access token
Use api [GET /snappy/users/me](#get-all-businesses) and choose business you want to connect api from list `businesses`.
Or api [GET /snappy/businesses/:business_id](#get-a-specific-business).
Then you can obtain a long-term access token with a 2-year expiration by using the `secret_key` field of the business.

<aside class="notice">
Note that only owner of business can get long-term access token.
</aside>

## Refresh long-term access token

```http
POST /snappy/businesses/:business_id?access_token=<access_token> HTTP/1.1
Content-Type: application/json
```

> Sample params

```json
{
    "reset_token": true
}
```

> Response if success

```json
{
    "business": {
        "coupons": [...],
        "id": 63,
        "inserted_at": "2018-04-17T15:07:49",
        "is_default": true,
        "is_owner": true,
        "last_payment_at": null,
        "name": "SG1",
        "owner_id": "14d4a1a1-ea42-4164-805d-e240f2561f71",
        "owner_name": "SG1",
        "payment_methods": [...],
        "phone_number": "0937123123",
        "remaining_balance": 0,
        "total_balance": 0,
        "tracking_count": 3,
        "unique_name": "S61",
        "updated_at": "2018-04-17T15:14:26",
        "secret_key": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...", # New long-term access token
    },
    "success": true
}
```

### HTTP Request

`POST /snappy/businesses/:business_id`

### Parameters

Parameter | Required | Type    | Default | Description
--------- | ------- | ------- | ------- | -----------
reset_token | true | boolean | | true

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

### Parameters

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

### Parameters

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
            "business_payments": [],
            "id": 63,
            "inserted_at": "2018-04-17T15:07:49",
            "is_default": true,
            "is_owner": true,
            "last_payment_at": null,
            "name": "SG1",
            "owner_id": "14d4a1a1-ea42-4164-805d-e240f2561f71",
            "owner_name": "SG1",
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

### Parameters

Parameter | Required | Type    | Default | Description
--------- | ------- | ------- | ------- | -----------
access_token | true | string | | Your personal acess_token

## Get a Specific Business

```http
GET /snappy/businesses/:business_id?access_token=<access_token> HTTP/1.1
```

> Response

```json
{
    "business": {
        "coupons": [...],
        "id": 63,
        "inserted_at": "2018-04-17T15:07:49",
        "is_default": true,
        "is_owner": true,
        "last_payment_at": null,
        "name": "SG1",
        "owner_id": "14d4a1a1-ea42-4164-805d-e240f2561f71",
        "owner_name": "SG1",
        "payment_methods": [...],
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

`GET /snappy/businesses/:business_id`

### Parameters

Parameter | Required | Type    | Default | Description
--------- | ------- | ------- | ------- | -----------
access_token | true | string | | Your personal acess_token
business_id | true | integer | | Id of a business in list businesses. Get in api [GET /user/me](#get-all-businesses)

## Get All Business Addresses

```http
GET /snappy/businesses/:business_id/addresses?access_token=<access_token> HTTP/1.1
```

> Response if success

```json
{
    "data": {
        "addresses": [
            {
                "address": "ha noi",
                "commune_id": "1012951",
                "district_id": "10129",
                "full_address": "Địa điểm mặc định - ha noi - Xã Ba Vì, Huyện Ba Vì, Hà Nội",
                "id": "889ca20a-433e-4f30-bf52-34bc10054de7",
                "inserted_at": "2021-05-22T09:09:53",
                "is_default": false,
                "is_removed": false,
                "name": "Địa điểm mặc định",
                "phone_number": "0332456789",
                "province_id": "101",
            },
            {
                "address": "test",
                "commune_id": "1011521",
                "district_id": "10115",
                "full_address": "test - test - Xã Phù Lỗ, Huyện Sóc Sơn, Hà Nội",
                "id": "ecb5150e-9aac-424b-b5d9-c813fbffa324",
                "inserted_at": "2021-04-26T14:31:10",
                "is_default": false,
                "is_removed": false,
                "name": "test",
                "phone_number": "0999999999",
                "province_id": "101",
            }
        ],
        "page_number": 1,
        "page_size": 50,
        "total_entries": 114,
        "total_pages": 3
    },
    "success": true
}
```

This endpoint create an address into your business.

### HTTP Request

`GET /snappy/businesses/:business_id/addresses`

### Parameters

Parameter | Required | Type    | Default | Description
--------- | ------- | ------- | ------- | -----------
access_token | true | string | | Your personal acess_token
page | false | integer | 1 | Page number

## Create Business Address

```http
POST /snappy/businesses/:business_id/addresses?access_token=<access_token> HTTP/1.1
```
> Sample params

```json
{
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
        "payment_methods": [],
        "phone_number": "0888888888",
        "tracking_count": 6,
        "unique_name": "S63",
        "updated_at": "2018-12-10T10:28:12"
    },
    "address": {
        "name": "Kho hàng Thái Hà",
        "phone_number": "0999999999",
        "address": "123 Thái Hà",
        "province_id": "101",
        "district_id": "10109",
        "commune_id": "1010939",
        "is_default": true
    },
    "message": "Bạn đã tạo kho hàng mới thành công",
    "success": true
}
```

This endpoint create an address into your business.

### HTTP Request

`POST /snappy/businesses/:business_id/addresses`

### Parameters

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
PUT /snappy/businesses/:business_id/addresses/:id?access_token=<access_token> HTTP/1.1
```
> Sample params

```json
{
    "business_id": 37,
    "id": "27d22b0e-0153-4830-8632-38645ab2a642",
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
        "payment_methods": [],
        "phone_number": "0888888888",
        "tracking_count": 6,
        "unique_name": "S63",
        "updated_at": "2018-12-10T10:28:12"
    },
    "address": {
        "name": "Kho hàng Thái Hà",
        "phone_number": "0999999999",
        "address": "123 Thái Hà",
        "province_id": "101",
        "district_id": "10109",
        "commune_id": "1010939",
        "is_default": true
    },
    "message": "Bạn đã cập nhật kho hàng thành công",
    "success": true
}
```

This endpoint update an address into your business.

### HTTP Request

`PUT /snappy/businesses/:business_id/addresses/:id`

### Parameters

Parameter | Required | Type    | Default | Description
--------- | ------- | ------- | ------- | -----------
access_token | true | string | | Your personal acess_token
business_id | true | integer | | Id of a business in list businesses. Get in api [GET /user/me](#get-all-businesses)
id | true | string | | Id `UUID` of one business address. Get in api [GET /businesses/:business_id/addresses](#get-all-business-addresses)
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
        "page_size": 20,
        "total_entries": 1,
        "total_pages": 1,
        "trackings": [
            {
                "business_address_id": "524a9669-2cd4-4ec1-9c7f-1a18412391aa",
                "department": {
                    "address": "35 Lê Văn Thiêm, Phường Nhân Chính",
                    "commune_id": "1011101",
                    "district_id": "10111",
                    "district_name": "Quận Thanh Xuân",
                    "full_address": "35 Lê Văn Thiêm, Phường Nhân Chính Quận Thanh Xuân Hà Nội",
                    "id": -1,
                    "name": "Snappy HN",
                    "province_id": "101",
                    "province_name": "Hà Nội",
                    "second_phone_number": "",
                    "shippo_id": "1161"
                },
                "creator_id": "51f003b6-28c1-444f-a1dd-670a2234ab8d",
                "status_color": "#639026",
                "picked_up_at": "2020-08-18T10:49:38",
                "returned_at": null,
                "customer_tracking_id": "SNAPPY172233NCM2018",
                "tags": [],
                "last_update": {
                    "last_updated_at": null,
                    "location": null,
                    "note": "Thành Công",
                    "status": "Giao thành công",
                    "status_color": "#639026",
                    "updated_at": "2020-08-19T07:44:39"
                },
                "addition_services": [],
                "receiver_commune_id": null,
                "from": {
                    "address": "Số 37, Ngõ 107 Đào Tấn, Ba Đình, Hà Nội",
                    "commune_id": "1010115",
                    "district_id": "10101",
                    "full_address": "Đuôi Gà - Số 37, Ngõ 107 Đào Tấn, Ba Đình, Hà Nội - Phường Cống Vị, Quận Ba Đình, Hà Nội",
                    "id": "524a9669-2cd4-4ec1-9c7f-1a18412391aa",
                    "name": "Đuôi Gà",
                    "phone_number": "0328023559",
                    "province_id": "101",
                    "real_address": {
                        "address": "Số 12A ngách 121 Ngõ Thịnh Quang, Đi Từ Vĩnh Hồ Vào Đên Cuối Đường Rẽ Trái",
                        "commune_id": "",
                        "district_id": "10109",
                        "full_address": "Số 12A ngách 121 Ngõ Thịnh Quang, Đi Từ Vĩnh Hồ Vào Đên Cuối Đường Rẽ Trái - Quận Đống Đa, Hà Nội",
                        "province_id": "101"
                    },
                    "return_address": null
                },
                "current_status": "Giao thành công",
                "business": {
                    "hotlines": "0944603696, 0336895861, 0961309527, 0974573885",
                    "id": 1523,
                    "name": "duoigashop",
                    "owner": {
                        "avatar_url": null,
                        "email": "phantronggiap@gmail.com",
                        "fb_id": null,
                        "id": "51f003b6-28c1-444f-a1dd-670a2234ab8d",
                        "name": "duoigashop",
                        "permission": 1,
                        "phone_number": "+84974573885",
                        "signatures": null
                    },
                    "phone_number": "+84974573885"
                },
                "id": "S29975697",
                "receiver_province_id": "101",
                "creator": {
                    "avatar_url": null,
                    "email": "phantronggiap@gmail.com",
                    "fb_id": null,
                    "id": "51f003b6-28c1-444f-a1dd-670a2234ab8d",
                    "name": "duoigashop",
                    "permission": 1,
                    "phone_number": "+84974573885",
                    "signatures": null
                },
                "log": {
                    "payment_status": "locked",
                    "updated_at": "2020-08-19T14:05:01"
                },
                "balance_adjustment": -16000,
                "short_id": 997569,
                "sny_warehouse_id": null,
                "business_id": 1523,
                "delivered_at": "2020-08-18T16:04:36",
                "updated_at": "2020-08-19T07:46:02",
                "tracking_undeliverable": null,
                "updates": [
                    {
                        "is_extend_update": true,
                        "last_updated_at": null,
                        "location": null,
                        "note": "Đã giao",
                        "status": "Giao thành công",
                        "updated_at": "2020-08-18T16:04:36"
                    },
                    {
                        "is_extend_update": true,
                        "last_updated_at": null,
                        "location": null,
                        "note": "Đang giao",
                        "status": "Đang giao",
                        "updated_at": "2020-08-18T13:17:57"
                    },
                    {
                        "is_extend_update": true,
                        "last_updated_at": null,
                        "location": null,
                        "note": "Chờ giao",
                        "status": "Đang trong kho",
                        "updated_at": "2020-08-18T10:49:38"
                    },
                    {
                        "is_extend_update": true,
                        "last_updated_at": null,
                        "location": null,
                        "note": "Tạo đơn",
                        "status": "Đang lấy hàng",
                        "updated_at": "2020-08-18T09:15:03"
                    },
                    {
                        "editor": {
                            "avatar_url": null,
                            "email": "phantronggiap@gmail.com",
                            "fb_id": null,
                            "id": "51f003b6-28c1-444f-a1dd-670a2234ab8d",
                            "name": "duoigashop",
                            "permission": 1,
                            "phone_number": "+84974573885",
                            "signatures": null
                        },
                        "last_editor": {
                            "avatar_url": null,
                            "email": "phantronggiap@gmail.com",
                            "fb_id": null,
                            "id": "51f003b6-28c1-444f-a1dd-670a2234ab8d",
                            "name": "duoigashop",
                            "permission": 1,
                            "phone_number": "+84974573885",
                            "signatures": null
                        },
                        "last_updated_at": "2020-08-18T09:15:02",
                        "location": "Đuôi Gà - Số 37, Ngõ 107 Đào Tấn, Ba Đình, Hà Nội - Phường Cống Vị, Quận Ba Đình, Hà Nội",
                        "note": "Gọi cho khách trước khi đến. Shop cám ơn bưu tá",
                        "status": "Đơn mới",
                        "status_color": "#AD7E05",
                        "updated_at": "2020-08-18T09:15:02"
                    }
                ],
                "receiver_district_id": "10113",
                "services": {
                    "cod_service": {
                        "amount": 0,
                        "cost": 0,
                        "is_save_log_cod": true,
                        "use_cod": false
                    },
                    "discount": {
                        "department": "HN",
                        "discount_percentage": 20
                    },
                    "insurance_cost": 0,
                    "is_allow_checking_good": true,
                    "is_allow_try_out": false,
                    "is_confirm_returned": false,
                    "is_exchange": false,
                    "is_new_customer": false,
                    "is_receiver_pay": false,
                    "name": "same_day",
                    "name_vi": "Trong ngày",
                    "shipping_cost": 16000,
                    "shipping_cost_of_shop": 0
                },
                "inserted_at": "2020-08-18T09:15:02",
                "current_status_en": "delivered",
                "shop_id": null,
                "to": {
                    "address": "Ngõ 11 duy tân sau toà nhà viettel ( cầu giấy) - sđt khác 0978795766",
                    "commune_id": null,
                    "district_id": "10113",
                    "full_address": "Ngõ 11 duy tân sau toà nhà viettel ( cầu giấy) - sđt khác 0978795766 - Quận Cầu Giấy, Hà Nội",
                    "id": null,
                    "name": "Đào Mai",
                    "phone_number": "0936361700",
                    "province_id": "101",
                    "real_address": null,
                    "return_address": null
                },
                "print_data": {
                    "district_type": "NT",
                    "receiver_province": "HN",
                    "sender_province": "HN"
                },
                "returned_editor": null,
                "package_info": {
                    "items": [
                        {
                            "name": "Hộ vớ đi chân",
                            "quantity": 1,
                            "retail_price": 0,
                            "selected": false,
                            "weight": 100
                        }
                    ],
                    "snippet": "1 x 100g Hộ vớ đi chân",
                    "total_weight": 100,
                    "value": 0
                }
            }
        ]
    }
}
```

This endpoint retrieves all trackings into your business.

### HTTP Request

`GET /snappy/trackings`

### Parameters

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

## Show Tracking

```http
GET /snappy/trackings/:id?access_token=<access_token> HTTP/1.1
```

> Response

```json
{
   "success":true,
   "tracking":{
      "intercity_bag_id":null,
      "services":{
         "name_vi":"Chuyển phát nhanh",
         "is_allow_try_out":false,
         "is_allow_checking_good":false,
         "is_new_customer":false,
         "receiver_commune_id":"1010113",
         "cod_cost":0,
         "cod":0,
         "value":0,
         "sender_district_id":"10137",
         "shop_note":null,
         "is_receiver_pay":false,
         "receiver_district_id":"10101",
         "is_save_log_insurance_cost":false,
         "delivery_note":"",
         "is_confirm_returned":false,
         "is_save_log_return":false,
         "services":{
            "express":{
               "cost":16000,
               "delivery_time":"Trong ngày",
               "discount_percentage":20,
               "each_weight":300,
               "each_weight_cost":30000,
               "lgt_weight_cost":0,
               "weight_threshold":100
            }
         },
         "insurance_cost":0,
         "return_cost":0,
         "shipping_cost":20000,
         "is_save_log_shipping_cost":false,
         "discount":null,
         "name":"express",
         "sender_commune_id":"1013731",
         "pickup_note":",csa",
         "business_id":2,
         "service_name":"express",
         "total_weight":10,
         "is_save_log_shipping_cost_of_shop":false,
         "is_exchange":false,
         "error":null,
         "cod_service":{
            "amount":0,
            "cost":0,
            "is_save_log_cod":false,
            "original_cod":0,
            "use_cod":false
         },
         "shipping_cost_of_shop":0
      },
      "from":{
         "address":"13",
         "commune_id":"1013731",
         "district_id":"10137",
         "full_address":"123 - 13 - Xã An Khánh, Huyện Hoài Đức, Hà Nội",
         "id":"1c86c15a-cf60-47f4-8da3-11af3e047782",
         "name":"123",
         "phone_number":"+84123231321",
         "province_id":"101",
         "real_address":null,
         "return_address":null
      },
      "sny_warehouse_id":null,
      "inserted_at":"2020-12-17T12:16:42",
      "last_update":{
         "editor":{
            "avatar_url":null,
            "email":"leminh@gmail.com",
            "fb_id":null,
            "id":"ebebe989-75e1-438a-b06c-a6e9b0f6504b",
            "name":"lê minh",
            "permission":6,
            "phone_number":"+84123456788",
            "signatures":null
         },
         "last_editor":{
            "avatar_url":null,
            "email":"leminh@gmail.com",
            "fb_id":null,
            "id":"ebebe989-75e1-438a-b06c-a6e9b0f6504b",
            "name":"lê minh",
            "permission":6,
            "phone_number":"+84123456788",
            "signatures":null
         },
         "last_updated_at":"2020-12-17T12:16:42",
         "location":"123 - 13 - Xã An Khánh, Huyện Hoài Đức, Hà Nội",
         "note":"Khởi tạo vận đơn",
         "status":"Đơn mới",
         "status_color":"#AD7E05",
         "status_en":"request_received",
         "updated_at":"2020-12-17T12:16:42"
      },
      "shop_id":null,
      "picked_up_at":null,
      "receiver_district_id":"10101",
      "status_color":"#AD7E05",
      "balance_adjustment":0,
      "delivered_at":null,
      "customer_tracking_id":null,
      "shipper_id":null,
      "current_status":"Đơn mới",
      "first_import_warehouse_at":null,
      "current_status_en":"request_received",
      "business":{
         "coupon_ids":[

         ],
         "hotlines":null,
         "id":2,
         "name":"lê minh",
         "owner":{
            "avatar_url":null,
            "email":"leminh@gmail.com",
            "fb_id":null,
            "id":"ebebe989-75e1-438a-b06c-a6e9b0f6504b",
            "name":"lê minh",
            "permission":6,
            "phone_number":"+84123456788",
            "signatures":null
         },
         "phone_number":"+84123456788"
      },
      "has_partner":false,
      "returned_editor":null,
      "department":{
         "address":"35 Lê Văn Thiêm, Phường Nhân Chính",
         "commune_id":"8050307",
         "district_id":"80503",
         "district_name":"Thành phố Châu Đốc",
         "full_address":"35 Lê Văn Thiêm, Phường Nhân Chính - Xã Vĩnh Tế, Thành phố Châu Đốc, An Giang",
         "name":"Snappy HN",
         "phone_number":"0934559505",
         "province_id":"805",
         "province_name":"An Giang"
      },
      "returner_id":null,
      "print_data":{
         "district_type":"NT",
         "receiver_province":"HAN",
         "sender_province":"HAN"
      },
      "is_lost":false,
      "returned_at":null,
      "receiver_commune_id":"1010113",
      "short_id":173,
      "creator_id":"ebebe989-75e1-438a-b06c-a6e9b0f6504b",
      "tracking_undeliverable":null,
      "updated_at":"2020-12-17T12:16:42",
      "business_id":2,
      "business_address_id":"1c86c15a-cf60-47f4-8da3-11af3e047782",
      "picker_id":null,
      "tags":[

      ],
      "creator":{
         "avatar_url":null,
         "email":"leminh@gmail.com",
         "fb_id":null,
         "id":"ebebe989-75e1-438a-b06c-a6e9b0f6504b",
         "name":"lê minh",
         "permission":6,
         "phone_number":"+84123456788",
         "signatures":null
      },
      "delivery_times":0,
      "package_info":{
         "items":[
            {
               "name":"xs",
               "quantity":1,
               "retail_price":0,
               "selected":false,
               "weight":10
            }
         ],
         "snippet":"1 x 10g xs",
         "total_weight":10,
         "value":0
      },
      "updates":[
         {
            "editor":{
               "avatar_url":null,
               "email":"leminh@gmail.com",
               "fb_id":null,
               "id":"ebebe989-75e1-438a-b06c-a6e9b0f6504b",
               "name":"lê minh",
               "permission":6,
               "phone_number":"+84123456788",
               "signatures":null
            },
            "last_editor":{
               "avatar_url":null,
               "email":"leminh@gmail.com",
               "fb_id":null,
               "id":"ebebe989-75e1-438a-b06c-a6e9b0f6504b",
               "name":"lê minh",
               "permission":6,
               "phone_number":"+84123456788",
               "signatures":null
            },
            "last_updated_at":"2020-12-17T12:16:42",
            "location":"123 - 13 - Xã An Khánh, Huyện Hoài Đức, Hà Nội",
            "note":"Khởi tạo vận đơn",
            "status":"Đơn mới",
            "status_color":"#AD7E05",
            "status_en":"request_received",
            "updated_at":"2020-12-17T12:16:42"
         }
      ],
      "addition_services":[

      ],
      "id":"S00001735",
      "receiver_province_id":"101",
      "log":null,
      "to":{
         "address":"fe Phường",
         "commune_id":"1010113",
         "district_id":"10101",
         "full_address":"fe Phường - Phường Đội Cấn, Quận Ba Đình, Hà Nội",
         "id":null,
         "name":"fekjw",
         "phone_number":"090999898",
         "province_id":"101",
         "real_address":null,
         "return_address":null
      }
   }
}

```

This endpoint retrieves a tracking.

### HTTP Request

`GET /snappy/trackings/:id`

### Parameters

Parameter | Required | Type    | Default | Description
--------- | ------- | ------- | ------- | -----------
access_token | true | string | | Your personal acess_token
id | true | string | | Id of a tracking in list trackings. Get in api [GET /snappy/trackings](#get-trackings)

## Create tracking

```http
POST /snappy/trackings/create?access_token=<access_token> HTTP/1.1
Content-Type: application/json
```

> Sample params

```json
{
    "access_token": "eyJ1aWQiOiIxNGQ0YTFhMS1lYTQyLTQxNjQtODA1ZC1lMjQwZjI1NjFmNzEiLCJpYXQiOj",
    "business_id": 37,
    "business_address_id": "82019ce2-088d-4cb1-8e8a-c6255d12ce6c",
    "receiver_name": "test",
    "receiver_phone_number": "0955555555",
    "receiver_address": "12 test",
    "receiver_province_id": "701",
    "receiver_district_id": "70101",
    "receiver_commune_id": "7010101",
    "is_split_pkg": false,
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
    "value": 600000,
    "affiliate_id": "snappy"
}
```

> Response if success

```json
{
    "message": "Vận đơn đã được khởi tạo thành công",
    "success": true,
    "tracking": {
        "business_address_id": "ca4fb6d3-51aa-4d85-a2fb-f22018809f6a",
        "department": {
            "address": "35 Lê Văn Thiêm, Phường Nhân Chính",
            "commune_id": "1011101",
            "district_id": "10111",
            "district_name": "Quận Thanh Xuân",
            "full_address": "35 Lê Văn Thiêm, Phường Nhân Chính Quận Thanh Xuân Hà Nội",
            "id": -1,
            "name": "Snappy HN",
            "phone_number": "1900636505",
            "province_id": "101",
            "province_name": "Hà Nội",
            "second_phone_number": "",
        },
        "creator_id": "ba1762fb-c3f5-4faa-9eea-e03b9ed9eb31",
        "status_color": "#AD7E05",
        "picked_up_at": null,
        "returned_at": null,
        "customer_tracking_id": null,
        "print_department": null,
        "tags": [],
        "last_update": {
            "editor": {
                "avatar_url": null,
                "email": "sonhgc00016@gmail.com",
                "fb_id": "1361243100592751",
                "id": "ba1762fb-c3f5-4faa-9eea-e03b9ed9eb31",
                "name": "Hoàng Sơn",
                "permission": 15,
                "phone_number": "+84968999999",
                "signatures": null
            },
            "last_editor": {
                "avatar_url": null,
                "email": "sonhgc00016@gmail.com",
                "fb_id": "1361243100592751",
                "id": "ba1762fb-c3f5-4faa-9eea-e03b9ed9eb31",
                "name": "Hoàng Sơn",
                "permission": 15,
                "phone_number": "+84968999999",
                "signatures": null
            },
            "last_updated_at": "2020-08-19T15:05:40",
            "location": "test - sô 58 tố hữu - Phường Trung Văn, Quận Nam Từ Liêm, Hà Nội",
            "note": "Khởi tạo vận đơn",
            "status": "Đơn mới",
            "status_color": "#AD7E05",
            "updated_at": "2020-08-19T15:05:40"
        },
        "addition_services": [],
        "receiver_commune_id": null,
        "from": {
            "address": "sô 58 tố hữu",
            "commune_id": "1012123",
            "district_id": "10121",
            "full_address": "test - sô 58 tố hữu - Phường Trung Văn, Quận Nam Từ Liêm, Hà Nội",
            "id": "ca4fb6d3-51aa-4d85-a2fb-f22018809f6a",
            "name": "test",
            "phone_number": "+84987654321",
            "province_id": "101",
            "real_address": null,
            "return_address": null
        },
        "current_status": "Đơn mới",
        "business": {
            "hotlines": "0999999999, 0888888888",
            "id": 37,
            "name": "Hemlock",
            "owner": {
                "avatar_url": null,
                "email": "sonhgc00016@gmail.com",
                "fb_id": "1361243100592751",
                "id": "ba1762fb-c3f5-4faa-9eea-e03b9ed9eb31",
                "name": "Hoàng Sơn",
                "permission": 15,
                "phone_number": "+84968999999",
                "signatures": null
            },
            "phone_number": "+84916880806"
        },
        "id": "S29994515",
        "receiver_province_id": "101",
        "creator": {
            "avatar_url": null,
            "email": "sonhgc00016@gmail.com",
            "fb_id": "1361243100592751",
            "id": "ba1762fb-c3f5-4faa-9eea-e03b9ed9eb31",
            "name": "Hoàng Sơn",
            "permission": 15,
            "phone_number": "+84968999999",
            "signatures": null
        },
        "log": null,
        "balance_adjustment": 0,
        "short_id": 999451,
        "sny_warehouse_id": null,
        "business_id": 37,
        "delivered_at": null,
        "print_district": null,
        "updated_at": "2020-08-19T15:05:40",
        "tracking_undeliverable": null,
        "updates": [
            {
                "editor": {
                    "avatar_url": null,
                    "email": "sonhgc00016@gmail.com",
                    "fb_id": "1361243100592751",
                    "id": "ba1762fb-c3f5-4faa-9eea-e03b9ed9eb31",
                    "name": "Hoàng Sơn",
                    "permission": 15,
                    "phone_number": "+84968999999",
                    "signatures": null
                },
                "last_editor": {
                    "avatar_url": null,
                    "email": "sonhgc00016@gmail.com",
                    "fb_id": "1361243100592751",
                    "id": "ba1762fb-c3f5-4faa-9eea-e03b9ed9eb31",
                    "name": "Hoàng Sơn",
                    "permission": 15,
                    "phone_number": "+84968999999",
                    "signatures": null
                },
                "last_updated_at": "2020-08-19T15:05:40",
                "location": "test - sô 58 tố hữu - Phường Trung Văn, Quận Nam Từ Liêm, Hà Nội",
                "note": "Khởi tạo vận đơn",
                "status": "Đơn mới",
                "status_color": "#AD7E05",
                "updated_at": "2020-08-19T15:05:40"
            }
        ],
        "receiver_district_id": "10101",
        "services": {
            "cod_service": {
                "amount": 200000,
                "cost": 0,
                "is_save_log_cod": false,
                "use_cod": true
            },
            "discount": {
                "department": "HN",
                "discount_percentage": 20
            },
            "insurance_cost": 0,
            "is_allow_checking_good": false,
            "is_allow_try_out": false,
            "is_confirm_returned": false,
            "is_exchange": false,
            "is_receiver_pay": false,
            "is_save_log_insurance_cost": false,
            "is_save_log_return": false,
            "is_save_log_shipping_cost": false,
            "is_save_log_shipping_cost_of_shop": false,
            "name": "same_day",
            "name_vi": "Trong ngày",
            "shipping_cost": 16000,
            "shipping_cost_of_shop": 0
        },
        "inserted_at": "2020-08-19T15:05:40",
        "current_status_en": "request_received",
        "shop_id": null,
        "to": {
            "address": "addess test",
            "commune_id": null,
            "district_id": "10101",
            "full_address": "addess test - Quận Ba Đình, Hà Nội",
            "id": null,
            "name": "test",
            "phone_number": "0999999999",
            "province_id": "101",
            "real_address": null,
            "return_address": null
        },
        "print_data": {
            "district_type": "NT",
            "receiver_province": "HN",
            "sender_province": "HN"
        },
        "returned_editor": null,
        "package_info": {
            "items": [
                {
                    "name": "test",
                    "quantity": 1,
                    "retail_price": 0,
                    "selected": false,
                    "weight": 20
                }
            ],
            "is_split_pkg": false,
            "snippet": "1 x 20g test",
            "total_weight": 20,
            "value": 200000
            "parent_id": null,
            "child_tracking_id": null
        }
    }
}
```

This endpoint create a tracking into your business.

### HTTP Request

`POST /snappy/trackings/create`

### Parameters

Parameter | Required | Type    | Default | Description
--------- | ------- | ------- | ------- | -----------
access_token | true | string | | Your personal acess_token
business_id | true | integer | | Id of a business in list businesses. Get in api [GET /user/me](#get-all-businesses)
business_address_id | true | string | | Id `UUID` of one business address. Get in api [GET /businesses/:business_id/addresses](#get-all-business-addresses) (NOTE: if you don't want to create one, you have to use alternative data fields, detail is listed in **Extra Fields** part below)
pickup_note | false | string | | Pickup note of shop
delivery_note | false | string | | Delivery note of shop
receiver_name | true | string | | Name of receiver
receiver_phone_number | true | string | | Phone number of receiver
receiver_address | true | string | | Address of receiver (NOTE: you can use alternative field describe in **alternative for address fields** part below)
receiver_province_id | true | string | | Id of receiver's province. Get in api [GET /geo/provinces](#get-provinces) (NOTE: you can use alternative field describe in **Alternative for address fields** part below )
receiver_district_id | true | string | | Id of receiver's district. Get in api [GET /geo/districts](#get-districts) (NOTE: you can use alternative field describe in **alternative for address fields** part below )
receiver_commune_id | false | string | | Id of receiver's commune. Get in api [GET /geo/communes](#get-communes) (NOTE: you can use alternative field describe in **Alternative for address fields** part below )
is_split_pkg | false | boolean | false | If `true` use split package feature
items | true | array | | List of items in tracking package
total_weight | true | integer | 200 | Total weight of items (gram)
service_name | true | string | | Name of service one of `express` or `standard`. Get in api [GET /snappy/trackings/cal_shipping_cost](#calculate-shipping-cost)
cod | false | integer | | Amount of cod or values of all items in package
value | false | integer | | Insurance premium value, which is the basis for calculating insurance premiums and compensation when an incident occurs
note | false | string | `Khởi tạo vận đơn` | Note of each status in tracking
customer_tracking_id | false | string |  | The custom id of customer
is_receiver_pay | false | boolean | false | If `true` all cost of the tracking will be paid by the receiver
is_allow_checking_good | false | boolean | false | If `true` means to allow the receiver to see the product
is_allow_try_out | false | boolean | false | If `true` means to allow the receiver to try the product
shop_note | false | string | false | Private note of shop
affiliate_id | false | string |  | Use for calculate commission base of shipping cost with partner

Params `items`

Parameter | Required | Type    | Default | Description
--------- | ------- | ------- | ------- | -----------
name | true | string | | Name of item or product
quantity | true | integer | | Quantity of item or product

### Extra Fields

### Alternative for business_address_id:

Parameter | Required | Type    | Default | Description
--------- | ------- | ------- | ------- | -----------
sender_name | false | string | | name of the sender (shop) who creates tracking
sender_phone_number | false | string | | phone number of sender Ex: 0332456789
sender_address | false | string | | address of sender (NOTE: you can use alternative field describe in **alternative for address fields** part below)
sender_province_id | false | string | | Id of sender's province. Get in api [GET /geo/provinces](#get-provinces) (NOTE: you can use alternative field describe in **Alternative for address fields** part below )
sender_district_id | false | string | | Id of sender's district. Get in api [GET /geo/districts](#get-districts) (NOTE: you can use alternative field describe in **Alternative for address fields** part below )
sender_commune_id | false | string | | Id of receiver's commune. Get in api [GET /geo/communes](#get-communes) (NOTE: you can use alternative field describe in **Alternative for address fields** part below )

### Alternative for address fields:
#### For convenience, you don't need to send all the fields related to address (Ex:`receiver_province_id, receiver_district_id, receiver_commune_id, ...`), instead you just send all data with only one field like this:
`
{ receiver_full_address: 'số 58 tố hữu - Phường Trung Văn, Quận Nam Từ Liêm, Hà Nội' }
`

####
Parameter | Required | Type    | Default | Description
--------- | ------- | ------- | ------- | -----------
receiver_full_address | false | string | | text describe address of receiver
sender_full_address | false | string | | text describe address of sender
## Calculate shipping cost

```http
POST /snappy/trackings/cal_shipping_cost HTTP/1.1
Content-Type: application/json
```

> Sample params

```json
{
    "business_id": 37,
    "sender_province_id": "101",
    "sender_district_id": "10101",
    "receiver_province_id": "701",
    "receiver_district_id": "70129",
    "receiver_commune_id": "7012901",
    "cod": 1000000,
    "value": 1000000,
    "total_weight": 100,
    "is_receiver_pay": false
}
```

> Response if success

```json
{
    "cod": 0,
    "cod_cost": 0,
    "discount": null,
    "error": null,
    "insurance_cost": 0,
    "is_receiver_pay": false,
    "message": null,
    "receiver_district_id": "70129",
    "services": {
        "express": {
            "cost": 30000,
            "delivery_time": "1 - 2 ngày",
            "each_500": 10000,
            "weight_threshold": 500
        },
        "standard": {
            "cost": 25000,
            "delivery_time": "3 - 4 ngày",
            "each_500": 5000,
            "weight_threshold": 1000
        }
    },
    "shipping_cost": 30000,
    "success": true,
    "value": 0
}
```

This endpoint calculate all cost of a tracking.

### HTTP Request

`POST /snappy/trackings/cal_shipping_cost`

### Parameters

Parameter | Required | Type    | Default | Description
--------- | ------- | ------- | ------- | -----------
business_id | true | integer | | Id of a business in list businesses. Get in api [GET /user/me](#get-all-businesses)
sender_province_id | true | string | | Id of sender's district. Get in api [GET /geo/districts](#get-provinces)
sender_district_id | true | string | | Id of sender's district. Get in api [GET /geo/districts](#get-districts)
receiver_province_id | true | string | | Id of receiver's district. Get in api [GET /geo/districts](#get-provinces)
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
    "tracking_id": "S29994515",
    "note": "Lý do hủy vận đơn"
}
```

> Response if success

```json
{
    "message": "Cập nhật trạng thái vận đơn thành công",
    "success": true,
    "tracking": {
        "package_info": {
            "items": [
                {
                    "name": "test",
                    "quantity": 1,
                    "retail_price": 0,
                    "selected": false,
                    "weight": 20
                }
            ],
            "snippet": "1 x 20g test",
            "total_weight": 20,
            "value": 200000
        },
        "shop_id": null,
        "customer_tracking_id": null,
        "services": {
            "cod_service": {
                "amount": 200000,
                "cost": 0,
                "is_save_log_cod": false,
                "use_cod": true
            },
            "discount": {
                "department": "HN",
                "discount_percentage": 20
            },
            "insurance_cost": 0,
            "is_allow_checking_good": false,
            "is_allow_try_out": false,
            "is_confirm_returned": false,
            "is_exchange": false,
            "is_new_customer": false,
            "is_receiver_pay": false,
            "is_save_log_return": false,
            "name": "same_day",
            "name_vi": "Trong ngày",
            "shipping_cost": 16000,
            "shipping_cost_of_shop": 0
        },
        "department": {
            "address": "35 Lê Văn Thiêm, Phường Nhân Chính",
            "commune_id": "1011101",
            "district_id": "10111",
            "district_name": "Quận Thanh Xuân",
            "full_address": "35 Lê Văn Thiêm, Phường Nhân Chính Quận Thanh Xuân Hà Nội",
            "id": -1,
            "name": "Snappy HN",
            "phone_number": "1900636505",
            "pickup_shippo_id": 10010376,
            "province_id": "101",
            "province_name": "Hà Nội",
            "second_phone_number": ""
        },
        "to": {
            "address": "addess test",
            "commune_id": null,
            "district_id": "10101",
            "full_address": "addess test - Quận Ba Đình, Hà Nội",
            "id": null,
            "name": "test",
            "phone_number": "0999999999",
            "province_id": "101",
            "real_address": null,
            "return_address": null
        },
        "creator": {
            "avatar_url": null,
            "email": "sonhgc00016@gmail.com",
            "fb_id": "1361243100592751",
            "id": "ba1762fb-c3f5-4faa-9eea-e03b9ed9eb31",
            "name": "Hoàng Sơn",
            "permission": 15,
            "phone_number": "+84968999999",
            "signatures": null
        },
        "addition_services": [],
        "tags": [],
        "updates": [
            {
                "editor": {
                    "avatar_url": null,
                    "email": "sonhgc00016@gmail.com",
                    "fb_id": "1361243100592751",
                    "id": "ba1762fb-c3f5-4faa-9eea-e03b9ed9eb31",
                    "name": "Hoàng Sơn",
                    "permission": 15,
                    "phone_number": "+84968999999",
                    "signatures": null
                },
                "last_editor": {
                    "avatar_url": null,
                    "email": "sonhgc00016@gmail.com",
                    "fb_id": "1361243100592751",
                    "id": "ba1762fb-c3f5-4faa-9eea-e03b9ed9eb31",
                    "name": "Hoàng Sơn",
                    "permission": 15,
                    "phone_number": "+84968999999",
                    "signatures": null
                },
                "last_updated_at": "2020-08-19T15:18:45",
                "location": null,
                "note": "Đã hủy",
                "sny_warehouse": null,
                "status": "Đã hủy",
                "status_color": "#DB3E36",
                "updated_at": "2020-08-19T15:18:45"
            },
            {
                "editor": {
                    "avatar_url": null,
                    "email": "sonhgc00016@gmail.com",
                    "fb_id": "1361243100592751",
                    "id": "ba1762fb-c3f5-4faa-9eea-e03b9ed9eb31",
                    "name": "Hoàng Sơn",
                    "permission": 15,
                    "phone_number": "+84968999999",
                    "signatures": null
                },
                "last_editor": {
                    "avatar_url": null,
                    "email": "sonhgc00016@gmail.com",
                    "fb_id": "1361243100592751",
                    "id": "ba1762fb-c3f5-4faa-9eea-e03b9ed9eb31",
                    "name": "Hoàng Sơn",
                    "permission": 15,
                    "phone_number": "+84968999999",
                    "signatures": null
                },
                "last_updated_at": "2020-08-19T15:05:40",
                "location": "test - sô 58 tố hữu - Phường Trung Văn, Quận Nam Từ Liêm, Hà Nội",
                "note": "Khởi tạo vận đơn",
                "status": "Đơn mới",
                "status_color": "#AD7E05",
                "updated_at": "2020-08-19T15:05:40"
            }
        ],
        "id": "S29994515",
        "picked_up_at": null,
        "business_address_id": "ca4fb6d3-51aa-4d85-a2fb-f22018809f6a",
        "updated_at": "2020-08-19T15:18:45",
        "log": null,
        "short_id": 999451,
        "creator_id": "ba1762fb-c3f5-4faa-9eea-e03b9ed9eb31",
        "returned_editor": null,
        "balance_adjustment": 0,
        "current_status": "Đã hủy",
        "receiver_province_id": "101",
        "last_update": {
            "editor": {
                "avatar_url": null,
                "email": "sonhgc00016@gmail.com",
                "fb_id": "1361243100592751",
                "id": "ba1762fb-c3f5-4faa-9eea-e03b9ed9eb31",
                "name": "Hoàng Sơn",
                "permission": 15,
                "phone_number": "+84968999999",
                "signatures": null
            },
            "last_editor": {
                "avatar_url": null,
                "email": "sonhgc00016@gmail.com",
                "fb_id": "1361243100592751",
                "id": "ba1762fb-c3f5-4faa-9eea-e03b9ed9eb31",
                "name": "Hoàng Sơn",
                "permission": 15,
                "phone_number": "+84968999999",
                "signatures": null
            },
            "last_updated_at": "2020-08-19T15:18:45",
            "location": null,
            "note": "Lý do hủy vận đơn",
            "sny_warehouse": null,
            "status": "Đã hủy",
            "status_color": "#DB3E36",
            "updated_at": "2020-08-19T15:18:45"
        },
        "business_id": 37,
        "receiver_district_id": "10101",
        "returned_at": null,
        "status_color": "#DB3E36",
        "inserted_at": "2020-08-19T15:05:40",
        "tracking_undeliverable": null,
        "current_status_en": "canceled",
        "delivered_at": null,
        "business": {
            "hotlines": "0999999999, 0888888888",
            "id": 37,
            "name": "Hemlock",
            "owner": {
                "avatar_url": null,
                "email": "sonhgc00016@gmail.com",
                "fb_id": "1361243100592751",
                "id": "ba1762fb-c3f5-4faa-9eea-e03b9ed9eb31",
                "name": "Hoàng Sơn",
                "permission": 15,
                "phone_number": "+84968999999",
                "signatures": null
            },
            "phone_number": "+84916880806"
        },
        "sny_warehouse_id": null,
        "print_data": {
            "district_type": "NT",
            "receiver_province": "HN",
            "sender_province": "HN"
        },
        "from": {
            "address": "sô 58 tố hữu",
            "commune_id": "1012123",
            "district_id": "10121",
            "full_address": "test - sô 58 tố hữu - Phường Trung Văn, Quận Nam Từ Liêm, Hà Nội",
            "id": "ca4fb6d3-51aa-4d85-a2fb-f22018809f6a",
            "name": "test",
            "phone_number": "+84987654321",
            "province_id": "101",
            "real_address": null,
            "return_address": null
        },
        "receiver_commune_id": null
    }
}
```

This endpoint cancel a tracking into your business.

### HTTP Request

`DELETE /snappy/trackings/cancel`

### Parameters

Parameter | Required | Type    | Default | Description
--------- | ------- | ------- | ------- | -----------
access_token | true | string | | Your personal acess_token
tracking_id | true | string | | Unique id of tracking
note | true | string | `Hủy vận đơn` | Note of status canceled

## Tracking Status

Name | VN Name | Color code | Description
-----| ------- | ---------- | ---------------
`request_received` | `Chờ lấy hàng` | `#AD7E05` | Vn Name is `current_status` and Name is `current_status_en` of api [GET /snappy/trackings](#get-trackings)
`processing_picked_up` | `Đang lấy hàng` | `#039BE5` | Vn Name is `current_status` and Name is `current_status_en` of api [GET /snappy/trackings](#get-trackings)
`picked_up_fail` | `Lấy thất bại` | `#C62828` | Vn Name is `current_status` and Name is `current_status_en` of api [GET /snappy/trackings](#get-trackings)
`picked_up` | `Đã lấy hàng` | `#277790` | Vn Name is `current_status` and Name is `current_status_en` of api [GET /snappy/trackings](#get-trackings)
`import_picking_warehouse` | `Nhập kho lấy` | `#87E8DE` | Vn Name is `current_status` and Name is `current_status_en` of api [GET /snappy/trackings](#get-trackings)
`waiting_on_the_way` | `Chờ trung chuyển` | `#9C27B0` | Vn Name is `current_status` and Name is `current_status_en` of api [GET /snappy/trackings](#get-trackings)
`processing_on_the_way` | `Đang trung chuyển` | `#9C27B0` | Vn Name is `current_status` and Name is `current_status_en` of api [GET /snappy/trackings](#get-trackings)
`on_the_way` | `Nhập kho giao` | `#129797` | Vn Name is `current_status` and Name is `current_status_en` of api [GET /snappy/trackings](#get-trackings)
`out_for_delivery` | `Đang giao hàng` | `#0063B8` | Vn Name is `current_status` and Name is `current_status_en` of api [GET /snappy/trackings](#get-trackings)
`part_delivery` | `Giao một phần` | `#4CAF50` | Vn Name is `current_status` and Name is `current_status_en` of api [GET /snappy/trackings](#get-trackings)
`delivered` | `Giao thành công` | `#639026` | Vn Name is `current_status` and Name is `current_status_en` of api [GET /snappy/trackings](#get-trackings)
`undeliverable` | `Giao thất bại` | `#DB3E36` | Vn Name is `current_status` and Name is `current_status_en` of api [GET /snappy/trackings](#get-trackings)
`waiting_for_return` | `Chờ hoàn` | `#FF4081` | Vn Name is `current_status` and Name is `current_status_en` of api [GET /snappy/trackings](#get-trackings)
`import_returning_warehouse` | `Nhập kho hoàn` | `#FFBB96` | Vn Name is `current_status` and Name is `current_status_en` of api [GET /snappy/trackings](#get-trackings)
`on_the_way_returning` | `Trung chuyển hoàn` | `#B37FEB` | Vn Name is `current_status` and Name is `current_status_en` of api [GET /snappy/trackings](#get-trackings)
`returning` | `Đang hoàn` | `#51ACC7` | Vn Name is `current_status` and Name is `current_status_en` of api [GET /snappy/trackings](#get-trackings)
`return_fail` | `Hoàn thất bại` | `#51ACC7` | Vn Name is `current_status` and Name is `current_status_en` of api [GET /snappy/trackings](#get-trackings)
`returned` | `Hoàn thành công` | `#FF4500` | Vn Name is `current_status` and Name is `current_status_en` of api [GET /snappy/trackings](#get-trackings)
`canceled` | `Đã hủy` | `#DB3E36` | Vn Name is `current_status` and Name is `current_status_en` of api [GET /snappy/trackings](#get-trackings)

<a href="https://statics.pancake.vn/user-content.pancake.vn/2022/7/18/781c995a5b34640daaabe5e83bf7364ff9fae848.png" target="_blank" rel="changelog_2022_04_15">![changelog_2022_04_15](https://statics.pancake.vn/user-content.pancake.vn/2022/7/18/781c995a5b34640daaabe5e83bf7364ff9fae848.png)</a>

## Tracking Undeliverable Category

> Sample respone of tracking.updates

```json
[
    {
        "status": "Giao không thành",
        "status_color": "#ff1744",
        "status_en": "undeliverable",
        "undeliverable_category": {
            "category": "DELIVERY_LATER",
            "category_vi": "Hẹn lại thời gian giao",
            "id": 30,
            "nomalized_reason": "hen ngay giao/hen thoi gian giao/hen sau/hen lai ngay/hen giao sau/hen giao thoi diem khac",
            "reason": "Hẹn ngày giao/Hẹn Thời gian giao/Hẹn sau/Hẹn lại ngày/Hẹn giao sau/Hẹn giao thời điểm khác",
            "sub_category": "DATE",
            "sub_category_vi": "Hẹn ngày giao/Hẹn Thời gian giao/Hẹn sau/Hẹn lại ngày/Hẹn giao sau/Hẹn giao thời điểm khác"
        },
        "updated_at": "2022-03-15T09:17:52"
    },
    {
        "status": "Giao không thành",
        "status_color": "#ff1744",
        "status_en": "undeliverable",
        "undeliverable_category": {
            "category": "CONTACT_RECEIVER",
            "category_vi": "Liên hệ người nhận",
            "id": 1,
            "nomalized_reason": "khong lien lac duoc/thue bao/nguoi nhan thue bao",
            "reason": "Không liên lạc được/Thuê bao/Người nhận thuê bao",
            "sub_category": "MAKE_PHONE_CALL_FAILED",
            "sub_category_vi": "Không liên lạc được/Thuê bao/Người nhận thuê bao"
        },
        "updated_at": "2022-03-15T09:45:17"
    },
    {
        "status": "Đang giao",
        "status_color": "#0063b8",
        "status_en": "out_for_delivery",
        "updated_at": "2022-03-15T07:45:17"
    }
]
```

ID | category | sub_category | category_vi | sub_category_vi
----| -----| ------- | ---------- | ---------------
1 | CONTACT_RECEIVER | MAKE_PHONE_CALL_FAILED | Liên hệ người nhận | Không liên lạc được/Thuê bao/Người nhận thuê bao
2 | CONTACT_RECEIVER | NO_ANSWERED | Liên hệ người nhận | Không liên lạc được/Không nghe máy/không gọi được/Tắt máy
3 | CONTACT_RECEIVER | BLOCK_SHIPPER_NUMBER | Liên hệ người nhận | Không liên lạc được/Chặn số/Số điện thoại không phải của người nhận
4 | WRONG_INFOMATION | WRONG_PHONE_NUMBER | Sai thông tin người nhận | Không liên lạc được/Sai số điện thoại/Thông tin liên hệ sai
5 | WRONG_INFOMATION | WRONG_ADDRESS | Sai thông tin người nhận | Sai địa chỉ/Đổi địa chỉ
6 | WRONG_INFOMATION | WRONG_COD | Sai thông tin người nhận | Sai COD/Sai tiền COD/Cập nhật COD
7 | REJECT_GOODS | NOT_ALLOW_CHECKING_GOOD | Từ chối nhận hàng | Không cho xem/Thử/Đòi thử/Mở xem
8 | REJECT_GOODS | WRONG_DELIVERY_COMMIT | Từ chối nhận hàng | Giao chậm quá cam kết/Lâu quá không nhận
9 | REJECT_GOODS | WRONG_PRODUCT | Từ chối nhận hàng | Sai sản phẩm
10 | REJECT_GOODS | RECEIVER_CHANGED_THEIR_MIND | Từ chối nhận hàng | Đổi ý/Khách đổi ý/Không ưng ý/Xem không nhận
11 | REJECT_GOODS | DO_NOT_ORDER | Từ chối nhận hàng | Không đặt/Đơn hàng ảo
12 | REJECT_GOODS | BROKEN_PRODUCT | Từ chối nhận hàng | Bể vỡ hỏng/suy xuyển/bể vỡ/Thiếu số lượng/Hư hỏng
13 | REJECT_GOODS | DUPLICATED_ORDER | Từ chối nhận hàng | Đơn bị trùng/Đã nhận đơn này trước đó/đặt trùng đơn/đặt nhầm
14 | REJECT_GOODS | NOT_ENOUGH_MONEY | Từ chối nhận hàng | Không đủ tiền/không có tiền
15 | REJECT_GOODS | CANCEL_ORDER | Từ chối nhận hàng | Báo huỷ
16 | REJECT_GOODS | PLACED_ANOTHER_ORDER | Từ chối nhận hàng | Đã mua sản phẩm khác
17 | REJECT_GOODS | NO_RECEIVER | Từ chối nhận hàng | Không có ở nhà/Không có người nhận/Không có nhà/Khách đi vắng
18 | REJECT_GOODS | RECEIVE_AT_WAREHOUSE | Từ chối nhận hàng | Tự đến nhận tại bưu cục/Tự đến bưu cục
19 | REJECT_GOODS | BOOM_GOODS | Từ chối nhận hàng | Không xuống nhận/Shipper chờ, đợi quá lâu
20 | COVID | ISOLATION_AREA | Ảnh hưởng của covid | Vùng cách ly
21 | SHIPPER_ACTION | CAN_NOT_SCHEDULE_WORK | Shipper | Chưa xếp được lịch giao
22 | SHIPPER_ACTION | CHANGE_SHIPPER | Shipper | Đổi shipper
23 | SHIPPER_ACTION | MIS_CLASSIFICATION | Shipper | Phân loại sai, sai tuyến đường
24 | SHIPPER_ACTION | DELIVERING | Shipper | Đường bị cấm/Thiên tai/bão/virus/Trời mưa to
25 | SHIPPER_ACTION | DELIVERING_MULTI_TIME | Shipper | Giao liên tiếp/Giao nhiều lần
26 | SHOP | REQUEST_RETURN | Shop | Chuyển hoàn, yêu cầu hoàn
27 | SHOP | SUSPECTED_FRAUD | Shop | Nghi ngờ Shop gian lận
28 | DELIVERY_LATER | DELIVERY_LATER_COMMON | Hẹn lại thời gian giao | Hẹn giao lại buổi/Hẹn sáng/Hẹn chiều/Hẹn tối/Mai giao
29 | DELIVERY_LATER | WORK_TIME | Hẹn lại thời gian giao | Hẹn giao lại giờ hành chính
30 | DELIVERY_LATER | DATE | Hẹn lại thời gian giao | Hẹn ngày giao/Hẹn Thời gian giao/Hẹn sau/Hẹn lại ngày/Hẹn giao sau/Hẹn giao thời điểm khác
31 | OTHER | SUB_OTHER | Các lý do khác / chưa xác định | Lý do khác
32 | REJECT_GOODS | SUB_OTHER | Từ chối nhận hàng | Lý do khác
33 | CONTACT_RECEIVER | SUB_OTHER | Liên hệ người nhận | Lý do khác
34 | COVID | SUB_OTHER | Ảnh hưởng của covid | Lý do khác
35 | DELIVERY_LATER | SUB_OTHER | Hẹn lại thời gian giao | Lý do khác
36 | SHIPPER_ACTION | SUB_OTHER | Shipper | Lý do khác
37 | SHOP | SUB_OTHER | Shop | Lý do khác
38 | WRONG_INFOMATION | SUB_OTHER | Sai thông tin người nhận | Lý do khác

## Tracking Print

This is special part. With this api you must be redirect or open new tab in your browser and apply this link `https://snappy.vn/print/:ids&business_id=<business_id>&access_token=<access_token>`

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
    "customer_tracking_id": "S61180418001",
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

When tracking update status to another status, Snappy will send a POST request following the callback url created in api [POST /snappy/trackings/webhook](#create-webhook). Max retry of the request with each tracking status to callback url is 5 times. List tracking status [Tracking Status](#tracking-status). The body of POST request sent to callback url similar to `tracking` field response from api [POST /snappy/trackings/create](#create-tracking)

## Create Webhook

```http
POST /snappy/businesses/:business_id/webhook?access_token=<access_token> HTTP/1.1
```
> Sample params

```json
{
    "access_token": "eyJ1aWQiOiIxNGQ0YTFhMS1lYTQyLTQxNjQtODA1ZC1lMjQwZjI1NjFmNzEiLCJpYXQiOj",
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

`POST /snappy/businesses/:business_id/webhook`

### Parameters

Parameter | Required | Type    | Default | Description
--------- | ------- | ------- | ------- | -----------
access_token | true | string | | Your personal acess_token
business_id | true | integer | | Id of a business in list businesses. Get in api [GET /user/me](#get-all-businesses)
callback_url | true | string | | The endpoint Snappy will send POST request

## Get a Specific Webhook

```http
GET /snappy/businesses/:business_id/webhook&access_token=<access_token> HTTP/1.1
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

`GET /snappy/businesses/:business_id/webhook`

### Parameters

Parameter | Required | Type    | Default | Description
--------- | ------- | ------- | ------- | -----------
access_token | true | string | | Your personal acess_token
business_id | true | integer | | Id of a business in list businesses. Get in api [GET /user/me](#get-all-businesses)

## Update Webhook

```http
PUT /snappy/businesses/:business_id/webhook&access_token=<access_token> HTTP/1.1
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

`PUT /snappy/businesses/:business_id/webhook`

### Parameters

Parameter | Required | Type    | Default | Description
--------- | ------- | ------- | ------- | -----------
access_token | true | string | | Your personal acess_token
business_id | true | integer | | Id of a business in list businesses. Get in api [GET /user/me](#get-all-businesses)
callback_url | true | string | | The endpoint Snappy will send POST request

# Request

## Request Category

Category | Translate | Sample Changes | Sample Updates
-----| ------------------ | ------ | -------
`request_delivering`| Yêu cầu giao hàng | null | null
`request_pickup`| Yêu cầu lấy hàng | null | null
`request_return`| Yêu cầu trả hàng | null | null
`update_cod`| Đổi COD vận đơn | { cod: 100000 } | { key: "Tiền COD", old: "0 ₫", new: "100000 ₫" }
`update_phone_number`| Đổi tên, số điện thoại hoặc thêm số điện thoại Người nhận | { name: "hoàng sơn", phone_number: "0999999999" } | { key: "Thông tin người nhận", old: "Phạm thị hậu 0888888888", new: "hoàng sơn 0999999999" }
`update_receiver_address`| Đổi địa chỉ giao hàng | { address: "123 chinh kinh nhan chinh", receiver_district_id: "10111", receiver_commune_id: "1011101", full_address: "123 chinh kinh nhan chinh Phường Nhân Chính Quận Thanh Xuân Hà Nội" } | { key: "Địa chỉ giao hàng", old: "Số 24 ngõ 1 ngách 1 Lý Tự Trọng Phường - Phường La Khê, Quận Hà Đông, Hà Nội", new: "123 chinh kinh nhan chinh Phường Nhân Chính Quận Thanh Xuân Hà Nội" }
`update_pickup_address`| Đổi thông tin điểm lấy | { business_address_id: "9c538687-71b5-453e-8cd0-b2c9b380e4af" } | { key: "Điểm lấy hàng", old: "58 Tố Hữu, Phường Kim Mã, Quận Ba Đình, Hà Nội", new: "kho hang moi moi - dia chi moi moii - Phường Đội Cấn, Quận Ba Đình, Hà Nội" }
`other`| Khác | null | null
`complain_attitude` | Thái độ của Nhân viên Snappy | null | null
`complain_lost` | Hàng thất lạc, giao thiếu, giao nhầm | null | null
`complain_break` | Hàng hỏng, vỡ | null | null
`complain_cod` | Thu sai tiền thu hộ | null | null
`complain_wrong_payment` | Đối soát thiếu tiền | null | null
`complain_delay_payment` | Chưa nhận được tiền chuyển khoản | null | null

<aside class="notice">
Please note that <code>changes</code> and <code>updates</code> is important to help us identify exactly update tracking information
</aside>

## Request Tag

Tag | Translate
-----| ------------------
`1`| GẤP

## Create Request

```http
POST /snappy/request?access_token=<access_token> HTTP/1.1
```
> Sample params

```json
{
    "access_token": "eyJ1aWQiOiIxNGQ0YTFhMS1lYTQyLTQxNjQtODA1ZC1lMjQwZjI1NjFmNzEiLCJpYXQiOj",
    "tracking_id": "S00037457"
    "category": "request_delivering",
    "reason": "Giao lại giúp mình vào ngày mai nhé",
    "changes": null,
    "updates": null,
    "delivery_date": "2020-10-20",
    "tag": 1
}
```

> Response if success

```json
{
    "message": "Gửi yêu cầu hỗ trợ thành công",
    "request": {
        "business": {
            "hotlines": "0111111111, 0222222222",
            "id": 1,
            "name": "Snappy",
            "phone_number": "0999999999"
        },
        "business_id": 1,
        "category_vi": "Yêu cầu giao lại/ lấy/ trả hàng",
        "changes": null,
        "creator": {
            "avatar_url": null,
            "email": "sonhgc00016@gmail.com",
            "fb_id": "1361232487260479",
            "id": "200da0c1-da68-42ad-ad3e-455d84e4e864",
            "name": "Hoàng Sơn",
            "phone_number": "+84999999999"
        },
        "creator_id": "200da0c1-da68-42ad-ad3e-455d84e4e864",
        "delivery_date": "2020-10-20",
        "department": -1,
        "editor": null,
        "editor_id": null,
        "handle_time": null,
        "handler": null,
        "handler_id": null,
        "id": 103,
        "inserted_at": "2020-10-13T23:08:57",
        "is_shop_recently_updated": null,
        "last_message": {
            "creator": {
                "avatar_url": null,
                "email": "sonhgc00016@gmail.com",
                "fb_id": "1361232487260479",
                "id": "200da0c1-da68-42ad-ad3e-455d84e4e864",
                "name": "Hoàng Sơn",
                "phone_number": "+84999999999"
            },
            "creator_id": "200da0c1-da68-42ad-ad3e-455d84e4e864",
            "delivery_date": "2020-10-20",
            "id": "c31301c1-fadf-4a2e-80bc-262424e289fe",
            "inserted_at": "2020-10-13T23:08:57",
            "is_mod": null,
            "message": "Giao lại giúp mình vào ngày mai nhé",
            "request_id": 103
        },
        "last_shop_message": {
            "counter": 1,
            "creator": {
                "avatar_url": null,
                "email": "sonhgc00016@gmail.com",
                "id": "200da0c1-da68-42ad-ad3e-455d84e4e864",
                "name": "Hoàng Sơn",
                "phone_number": "+84999999999"
            },
            "creator_id": "200da0c1-da68-42ad-ad3e-455d84e4e864",
            "delivery_date": "2020-10-20",
            "id": "c31301c1-fadf-4a2e-80bc-262424e289fe",
            "inserted_at": "2020-10-13T23:08:57",
            "is_mod": null,
            "message": "Giao lại giúp mình vào ngày mai nhé",
            "request_id": 103
        },
        "last_sny_message": null,
        "rate": null,
        "rate_note": null,
        "reason": "Giao lại giúp mình vào ngày mai nhé",
        "status": 1,
        "sub_category_vi": "Yêu cầu giao hàng",
        "tags": [
            0,
            1
        ],
        "tracking": {
            "from": {
                "address": "58 Tố Hữu",
                "commune_id": "1010111",
                "district_id": "10101",
                "full_address": "58 Tố Hữu, Phường Kim Mã, Quận Ba Đình, Hà Nội",
                "id": "f1e378e9-47d3-494e-960d-cbcebd34d424",
                "name": "One piece",
                "phone_number": "0988123789",
                "province_id": "101",
                "real_address": null,
                "return_address": null
            },
            "services": {
                "cod": 0,
                "cod_cost": 0,
                "cod_service": {
                    "amount": 0,
                    "cost": 0,
                    "is_save_log_cod": false,
                    "use_cod": false
                },
                "delivery_note": "",
                "discount": {
                    "department": "HN",
                    "shipping_cost_suburban_lt_5000": 22000
                },
                "error": null,
                "insurance_cost": 0,
                "is_allow_checking_good": true,
                "is_allow_try_out": true,
                "is_confirm_returned": false,
                "is_exchange": false,
                "is_new_customer": false,
                "is_receiver_pay": false,
                "is_save_log_insurance_cost": false,
                "is_save_log_return": false,
                "is_save_log_shipping_cost": false,
                "is_save_log_shipping_cost_of_shop": false,
                "name": "express",
                "name_vi": "Chuyển phát nhanh",
                "pickup_note": "",
                "receiver_district_id": "10125",
                "shipping_cost": 22000,
                "shipping_cost_of_shop": 0,
                "shop_note": "",
                "value": 0
            },
            "to": {
                "address": "Số 2 LK6A Làng Việt Kiều Châu Âu Đường Nguyễn Văn Lộc Phường",
                "commune_id": "1012503",
                "district_id": "10125",
                "full_address": "Số 2 LK6A Làng Việt Kiều Châu Âu Đường Nguyễn Văn Lộc Phường - Phường Mộ Lao, Quận Hà Đông, Hà Nội",
                "id": null,
                "name": "Trần Mai Hằng",
                "phone_number": "0999999999",
                "province_id": "101",
                "real_address": null,
                "return_address": null
            }
        },
        "tracking_id": "S00037442",
        "unread_count": 0,
        "updated_at": "2020-10-13T23:08:57",
        "updates": null
    },
    "success": true
}
```

This endpoint create an request to Snappy when a tracking need modify information, report abuse, etc..

### HTTP Request

`POST /snappy/request`

### Parameters

Parameter | Required | Type    | Default | Description
--------- | ------- | ------- | ------- | -----------
access_token | true | string | | Your personal acess_token
tracking_id | true | string | | tracking id of a tracking
category | true | string | | Category of request. Get in [Request Category](#request-category)
reason | true | string | | Reason of request
delivery_date | false | string | | delivery date of request category `request_delivering`
tag | false | integer | | Tag of request. Get in [Request Tag](#request-tag)
changes | true | map | | Changes of request must have for request category `update_cod`, `update_phone_number`, `update_receiver_address` and `update_pickup_address`. Get in [Request Tag](#request-category)
updates | true | map | | Updates of request must have for request category `update_cod`, `update_phone_number`, `update_receiver_address` and `update_pickup_address`. Get in [Request Tag](#request-category)

## Get List Requests for Trackings

```http
GET /snappy/request&access_token=<access_token> HTTP/1.1
```

> Response

```json
{
    "success": true,
    "trackings": [
        {
            "id": "S00037457",
            "requests": [
                {
                    "business": {
                        "hotlines": "0111111111, 0222222222",
                        "id": 1,
                        "name": "Snappy",
                        "phone_number": "0999999999"
                    },
                    "business_id": 1,
                    "category_vi": "Yêu cầu giao lại/ lấy/ trả hàng",
                    "changes": null,
                    "creator": {
                        "avatar_url": null,
                        "email": "sonhgc00016@gmail.com",
                        "fb_id": "1361232487260479",
                        "id": "200da0c1-da68-42ad-ad3e-455d84e4e864",
                        "name": "Hoàng Sơn",
                        "phone_number": "+84999999999",
                    },
                    "creator_id": "200da0c1-da68-42ad-ad3e-455d84e4e864",
                    "delivery_date": "2020-10-20",
                    "department": -1,
                    "editor": null,
                    "editor_id": null,
                    "handle_time": null,
                    "handler": null,
                    "handler_id": null,
                    "id": 101,
                    "inserted_at": "2020-10-13T22:57:59",
                    "last_message": {
                        "creator": {
                            "avatar_url": null,
                            "email": "sonhgc00016@gmail.com",
                            "fb_id": "1361232487260479",
                            "id": "200da0c1-da68-42ad-ad3e-455d84e4e864",
                            "name": "Hoàng Sơn",
                            "phone_number": "+84999999999"
                        },
                        "creator_id": "200da0c1-da68-42ad-ad3e-455d84e4e864",
                        "delivery_date": "2020-10-20",
                        "id": "92142d60-dff6-4544-a647-de1ca0a6eabd",
                        "inserted_at": "2020-10-13T22:57:59",
                        "is_mod": null,
                        "message": "1111",
                        "request_id": 101
                    },
                    "last_shop_message": {
                        "counter": 1,
                        "creator": {
                            "avatar_url": null,
                            "email": "sonhgc00016@gmail.com",
                            "fb_id": "1361232487260479",
                            "id": "200da0c1-da68-42ad-ad3e-455d84e4e864",
                            "name": "Hoàng Sơn",
                            "phone_number": "+84999999999"
                        },
                        "creator_id": "200da0c1-da68-42ad-ad3e-455d84e4e864",
                        "delivery_date": "2020-10-20",
                        "id": "92142d60-dff6-4544-a647-de1ca0a6eabd",
                        "inserted_at": "2020-10-13T22:57:59",
                        "is_mod": null,
                        "message": "1111",
                        "request_id": 101
                    },
                    "last_sny_message": null,
                    "rate": null,
                    "rate_note": null,
                    "reason": "1111",
                    "status": 1,
                    "sub_category_vi": "Yêu cầu giao hàng",
                    "tags": [
                        0
                    ],
                    "tracking": {
                        "from": {
                            "address": "58 Tố Hữu",
                            "commune_id": "1010111",
                            "district_id": "10101",
                            "full_address": "58 Tố Hữu, Phường Kim Mã, Quận Ba Đình, Hà Nội",
                            "id": "f1e378e9-47d3-494e-960d-cbcebd34d424",
                            "name": "One piece",
                            "phone_number": "0988123789",
                            "province_id": "101",
                            "real_address": null,
                            "return_address": null
                        },
                        "services": {
                            "cod": 0,
                            "cod_cost": 0,
                            "cod_service": {
                                "amount": 0,
                                "cost": 0,
                                "is_save_log_cod": false,
                                "use_cod": false
                            },
                            "delivery_note": "",
                            "discount": {
                                "department": "HN",
                                "shipping_cost_suburban_lt_5000": 22000
                            },
                            "error": null,
                            "insurance_cost": 0,
                            "is_allow_checking_good": true,
                            "is_allow_try_out": true,
                            "is_confirm_returned": false,
                            "is_exchange": false,
                            "is_new_customer": false,
                            "is_receiver_pay": false,
                            "is_save_log_insurance_cost": false,
                            "is_save_log_return": false,
                            "is_save_log_shipping_cost": false,
                            "is_save_log_shipping_cost_of_shop": false,
                            "name": "express",
                            "name_vi": "Chuyển phát nhanh",
                            "pickup_note": "",
                            "receiver_district_id": "10125",
                            "shipping_cost": 22000,
                            "shipping_cost_of_shop": 0,
                            "shop_note": "",
                            "value": 0
                        },
                        "to": {
                            "address": "Chung cư xuân mai complex dương nội (toà L) Phường",
                            "commune_id": "1012519",
                            "district_id": "10125",
                            "full_address": "Chung cư xuân mai complex dương nội (toà L) Phường - Phường Yên Nghĩa, Quận Hà Đông, Hà Nội",
                            "id": null,
                            "name": "Nguyễn thuỳ linh",
                            "phone_number": "0999999999",
                            "province_id": "101",
                            "real_address": null,
                            "return_address": null
                        }
                    },
                    "tracking_id": "S00037457",
                    "unread_count": 0,
                    "updated_at": "2020-10-13T22:57:59",
                    "updates": null
                }
            ]
        },
    ]
}
```

This endpoint retrieves a specific webhook callback url into your specific business.

### HTTP Request

`GET /snappy/request`

### Parameters

Parameter | Required | Type    | Default | Description
--------- | ------- | ------- | ------- | -----------
access_token | true | string | | Your personal acess_token
business_id | true | integer | | Id of a business in list businesses. Get in api [GET /user/me](#get-all-businesses)
tracking_ids | true | string | | List of tracking ids separate by comma. Sample: S00037457,S00037442,S0003743

# Changelog

## 2022-06-14

### Add new tracking undeliverable categories

<a href="https://statics.pancake.vn/user-content.pancake.vn/2022/6/14/4e986cc954ac4522eb838dd13341f2061f6cba9f.png" target="_blank" rel="changelog_2022_06_14">![changelog_2022_06_14](https://statics.pancake.vn/user-content.pancake.vn/2022/6/14/4e986cc954ac4522eb838dd13341f2061f6cba9f.png)</a>

## 2022-04-15

### Update tracking status

* Add new tracking status `import_picking_warehouse`, `import_returning_warehouse`, `return_fail` and change minor `VN Name` of some tracking status

<a href="https://statics.pancake.vn/user-content.pancake.vn/2022/6/14/f5f492f6c1a13b45fb1fbcc8d0292c6621df6dd1.png" target="_blank" rel="changelog_2022_04_15">![changelog_2022_04_15](https://statics.pancake.vn/user-content.pancake.vn/2022/6/14/f5f492f6c1a13b45fb1fbcc8d0292c6621df6dd1.png)</a>

## 2022-12-01

<a href="https://snappy.vn/post/34" target="_blank">https://snappy.vn/post/34</a>
