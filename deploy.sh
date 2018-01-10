cd /home/font-end/cafe-vux
git pull origin router
cnpm run build
rm -r /home/shop/procs/ppus/web.ppu/framework-web-pmu.pmu/shop-web-container.par/web.ear/web.war/static
rm -r /home/shop/procs/ppus/web.ppu/framework-web-pmu.pmu/shop-web-container.par/web.ear/web.war/index.html
cp -R /home/font-end/cafe-vux/dist/static /home/shop/procs/ppus/web.ppu/framework-web-pmu.pmu/shop-web-container.par/web.ear/web.war
cp /home/font-end/cafe-vux/dist/index.html /home/shop/procs/ppus/web.ppu/framework-web-pmu.pmu/shop-web-container.par/web.ear/web.war
