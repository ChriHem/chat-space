# Chat-Space DB設計  

## usersテーブル  
|Column|Type|Option|
|------|----|------|
|name|string|null: false, unique: true|
|email|string|null: false, unique: true|
|password|string|null: false|
## Association
- has_many :messages
- has_many :groups, throught: :users_groups
- has_manu :users_groups

## groupsテーブル
|Column|Type|Option|
|------|----|------|
|name|string|null: false|
|name|index|unique: true|
## Association
- has_many :messages
- has_many :users, through: :users_groups
- has_many :users_groups

## messageテーブル
|Column|Type|Option|
|------|----|------|
|content|text||
|image|string||
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
## Association
- belongs_to :user
- belongs_to :group

## group_userテーブル
|Column|Type|Option|
|------|----|------|
|user_id|integer|null :false, foreign_key: true|
|group_id|integer|null :false, foreign_key: true|
## Association
- belongs_to :user
- belongs_to :group