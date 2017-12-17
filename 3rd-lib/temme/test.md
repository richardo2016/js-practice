## 测试

[temme]:https://github.com/shinima/temme

这个测试来源于 [temme] 的[介绍](https://zhuanlan.zhihu.com/p/31624732?group_id=922178628863692800)，在 *nix 环境下，全局安装 teeme 后即可执行一下命令

```bash
curl -s https://movie.douban.com | temme '.ui-slide-item[data-title] @recentMovies { &[data-title=$title data-rate=$rate|Number]; a[href=$url]; }' --format > data/douban.local-test.json
```

来试一试抓取饿了么附近餐厅页面的餐厅信息

```bash
# ㄟ( ▔, ▔ )ㄏ
curl -s https://www.ele.me/place/wtw67nnqvq6?latitude=31.36716&longitude=121.42971 | temme 'a.rstblock @data { &[href^="/shop" data-rst-id=$rst data-bidding=$bidding]; .rstblock-logo img[src=$shop_logo_url]; }' --format > data/eleme-shop.local-test.json
```

因为是单页应用，页面需要由 js 渲染，所以……

先把包含数据的 html 片段存起来，通过 stdin 直接输送给 temme

```bash
# 获取不在竞价中的账户
cat eleme-shop-data.html | temme 'a.rstblock[href^="/shop/"] @outofBiddingShopList { &[href=$shop_id|replace("/shop/", "")|Number data-rst-id=$rst data-bidding=""]{$bidding = false}; .rstblock .rstblock-logo img[src=$shop_logo_url]; }' --format > data/eleme-shop-outofbidding.local-test.json
```

然后就可以得到输出的内容了。

**注意** 上述 [temme] 匹配中的 $bidding 被期望是个布尔型

再来试试饿了么附近餐厅页面的餐厅分类信息

```bash
cat eleme-shopcat-data.html | temme 'a.excavator-filter-item@shop_category_list {&{$category_name}; &[ubt-click=$ubt_click];}' --format > data/eleme-shopcat.local-test.json
```

**复杂一点的** 表达式在 inline bash 看着可能不是那么方便，可以将其房子啊 .temme 中，并做好排版.

```
# eleme-shop-bid-info.draw.temme
a.rstblock[href^="/shop/"] @biddingShopList {
  &[data-rst-id=$shop_id|Number data-bidding=$bid_info]{$bidding = true};
  &[data-bidding=""]{$bidding = false};
  .rstblock-logo img[src=$logo_url];
}

# 获取店铺的竞价信息
cat eleme-shop-data.html | temme eleme-shop-bid-info.draw.temme --format > data/eleme-shop-bid-info-raw.local-test.json
```

对该表达式要注意,

- 对于竞价与否, 使用了 `&[data-bidding=""]{$bidding = false};` 判定
- 对于存在竞价信息的餐厅, 使用了 `&[data-rst-id=$rst data-bidding=$bid_info]{$bidding = true};` 判定

上述例子已经让我们拿到我们需要的数据了，但是有个问题是拿到的数据中 bid_info 为 JSON 格式，我们希望进一步解析，但 [temme] 暂时没有提供 `JSON.parse` 等价的 filter , 此时我们需要用 `inline-filter definition` 或者 在 nodejs 中做进一步处理数据.

```
# 使用 inline-filter
cat eleme-shop-data.html | temme eleme-shop-bid-info-with-json-parse.draw.temme --format > data/eleme-shop-bid-info-with-json-parse.local-test.json

# 或者在 nodejs 中操作
node eleme-shop-bid-data-with-json-parse.js
```