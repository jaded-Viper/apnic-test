# apnic-test

Solution to apnic test


## Developing

- Pull the repository to local directory   
- run `docker-compose build`  
- run `docker-compose up`  

When run the import script will automatically check to see if it has the latest file and reimport if not
Once running call the endpoint:

```
http://127.0.0.1:3000/statistics/<economy>/<resource>/<year>
```
- economy: two character country code eg CN
- resource: one of asn, ipv4, ipv 6
- year: the year in which you would like the statistics eg 2016






--------------------------------------------------------------------------------
