package com.cafe.product;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.Assert;
import org.testng.annotations.AfterClass;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.Test;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class Product {
    private WebDriver driver;
    private WebDriverWait wait;

    @BeforeClass
    public void setup() {
        // System.setProperties("webdriver.gecko.driver", "");
        Map<String, String> mobileEmulation = new HashMap<String, String>();
        mobileEmulation.put("deviceName", "iPhone X");
        ChromeOptions chromeOptions = new ChromeOptions();
        chromeOptions.setExperimentalOption("mobileEmulation",mobileEmulation);
        driver = new ChromeDriver(chromeOptions);
        wait = new WebDriverWait(driver, 10);
    }
    @Test
    public void openWebsite() {
        driver.get("http://127.0.0.1");
        String url = driver.getCurrentUrl();
        Assert.assertEquals("http://127.0.0.1/#/menu", url);
    }

    @Test(dependsOnMethods = "openWebsite")
    public void clickCategory(){
        String cookieXpath = "//*[@id=\"app\"]/div/div[1]/div[2]/div[1]/ul/li[2]/span";
        waitElement(cookieXpath);
        driver.findElement(By.xpath(cookieXpath)).click();
        String animalCooikeXpath = "//*[@id=\"app\"]/div/div[1]/div[2]/div[2]/ul/li[2]/ul/li[1]/div/div/div/div/div/div/div/div/div/div[1]";
        String name = driver.findElement(By.xpath(animalCooikeXpath)).getText();
        Assert.assertEquals("动物饼干", name);
    }

    @Test(dependsOnMethods = "openWebsite")
    public void clickBuy() {
        String buyXpath = "//*[@id=\"app\"]/div/div[1]/div[2]/div[2]/ul/li[1]/ul/li[1]/div/div/div/div/div/div/div/div/div/div[3]/span[2]/button";
        waitElement(buyXpath);
        //        // System.out.println();
        WebElement element = driver.findElement(By.xpath(buyXpath));
        element.click();
        String addCartXpath = "//*[@id=\"app\"]/div/div[1]/div[3]/div[1]/div[3]/button[1]";
        String buyitXpath = "//*[@id=\"app\"]/div/div[1]/div[3]/div[1]/div[3]/button[2]";
        String addCart = driver.findElement(By.xpath(addCartXpath)).findElement(By.tagName("span")).getText();
        String buy = driver.findElement(By.xpath(buyitXpath)).findElement(By.tagName("span")).getText();
        Assert.assertEquals("加入购物车", addCart);
        Assert.assertEquals("立即购买", buy);
    }
    @Test(dependsOnMethods = "openWebsite")
    public void showdetailPage() throws InterruptedException {
        String productXpath = "//*[@id=\"app\"]/div/div[1]/div[2]/div[2]/ul/li[1]/ul/li[1]/div/div/div/div/div/div";
        waitElement(productXpath);
        WebElement product = driver.findElement(By.xpath(productXpath));
        String name = product.findElement(By.className("name")).getText();
        product.click();
        Thread.sleep(2000);
        String nameXpath = "//*[@id=\"app\"]/div/div[1]/div[3]/div[1]";
        waitElement(nameXpath);
        // wait.until(ExpectedConditions.visibilityOf(driver.findElement(By.xpath(nameXpath))));
        String url = driver.getCurrentUrl();
        Assert.assertEquals("http://127.0.0.1/#/food", url);
        Assert.assertEquals(name, driver.findElement(By.xpath(nameXpath)).getText());
    }
    @Test(dependsOnMethods = "openWebsite")
    public void clickHome() throws InterruptedException {
        String homeXpath = "//*[@id=\"app\"]/div/div[3]";
        waitElement(homeXpath);
        WebElement home = driver.findElement(By.xpath(homeXpath));
        List<WebElement> buttons = home.findElements(By.className("van-tabbar-item"));
        Assert.assertEquals("主页", buttons.get(0).findElement(By.className("van-tabbar-item__text")).getText());
        Assert.assertEquals("今日活动", buttons.get(1).findElement(By.className("van-tabbar-item__text")).getText());
        Assert.assertEquals("购物车", buttons.get(2).findElement(By.className("van-tabbar-item__text")).getText());
        Assert.assertEquals("我的", buttons.get(3).findElement(By.className("van-tabbar-item__text")).getText());
        // 点击主页，校验的数据
        buttons.get(0).click();
        Thread.sleep(1000);
        String logwrapper = "//*[@id=\"app\"]/div/div[1]/div[2]/div[1]/ul/li[1]/span";
        waitElement(logwrapper);
        Assert.assertEquals("http://127.0.0.1/#/menu", driver.getCurrentUrl());
        String srcpath = driver.findElement(By.xpath(logwrapper)).getText();
        Assert.assertEquals("饮品", srcpath);
        // 点击今日活动
        buttons.get(1).click();
        Thread.sleep(1000);
        String name = "//*[@id=\"app\"]/div/div[1]/div[1]/h1";
        waitElement(name);
        Assert.assertEquals("http://127.0.0.1/#/activity", driver.getCurrentUrl());
        Assert.assertEquals("商品列表", driver.findElement(By.xpath(name)).getText());
        // 点击购物车
        buttons.get(2).click();
        Thread.sleep(1000);
        String empty = "//*[@id=\"app\"]/div/div[1]/div/div/div[1]";
        waitElement(empty);
        Assert.assertEquals("http://127.0.0.1/#/cart", driver.getCurrentUrl());
        Assert.assertEquals("购物车快饿瘪了~~", driver.findElement(By.xpath(empty)).getText());
        System.out.println("done cart");
        // 点击我的
        buttons.get(3).click();
        Thread.sleep(1000);
        String membername = "//*[@id=\"app\"]/div/div[1]/div[1]/div/div[2]";
        waitElement(membername);
        Assert.assertEquals("http://127.0.0.1/#/member", driver.getCurrentUrl());
        Assert.assertEquals("游客", driver.findElement(By.xpath(membername)).getText());
    }

    @AfterClass
    public void tearDown() {
        driver.quit();
    }

    private void waitElement(String xpath) {
        wait.until(ExpectedConditions.visibilityOf(driver.findElement(By.xpath(xpath))));
    }
}
