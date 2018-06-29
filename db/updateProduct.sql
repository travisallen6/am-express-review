update products
set name = $2, price = $3
where id = $1;

select * from products;