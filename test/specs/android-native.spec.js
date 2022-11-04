describe('Android Native Feature Tests', () =>{
    it('Access an Activity directly', async () =>{
        //access activity
        await driver.startActivity("io.appium.android.apis", "io.appium.android.apis.app.AlertDialogSamples");
    
        //pause
        await driver.pause(3000);

        //assertion
        await expect($('//*[@text="App/Alert Dialogs"]')).toExist();
    });

    it('Working with Dialog Boxes', async () => {
        //access activity
        await driver.startActivity("io.appium.android.apis", "io.appium.android.apis.app.AlertDialogSamples");

        //click on first dialog
        await $('//*[@resource-id="io.appium.android.apis:id/two_buttons"]').click()

        //accept alert
        //await driver.acceptAlert();

         //dismiss alert
         //await driver.dismissAlert();

         //get alert text
         console.log('ALERT TEXT ', await driver.getAlertText());

         //click on the Ok button
         await $('//*[@resource-id="android:id/button1"]').click();

        //assertion -alert box is no longer visible
        await expect($('//*[@resource-id="android:id/alertTitle"]')).not.toExist();

    });

    it('Vertical scrolling', async () => {
        await $('~App').click();
        await $('~Activity').click();

        //scroll to the end
        //await $('android=new UiScrollable(new UiSelector().scrollable(true)).scrollToEnd(1,5)');
        //await $('~Secure Surfaces').click();

        //scroll textIntoView
        await $('android=new UiScrollable(new UiSelector().scrollable(true)).scrollTextIntoView("Secure Surfaces")').click();


        //assertion
        await expect($('~Secure Dialog')).toExist();
    });

    it('Horizontal scrolling', async () => {
        await driver.startActivity(
            "io.appium.android.apis",
            "io.appium.android.apis.view.Gallery1"
        );

        //Horizontal scrolling 
        await $('android=new UiScrollable(new UiSelector().scrollable(true)).setAsHorizontalList().scrollForward()');
        await $('android=new UiScrollable(new UiSelector().scrollable(true)).setAsHorizontalList().scrollBackward()');
        await driver.pause(3000);

    });

    it.only('Exercise scrolling and asserting', async () =>{
        await driver.startActivity(
            "io.appium.android.apis",
            "io.appium.android.apis.view.DateWidgets1"
        );
         
        //Getting the current date
        const date = await $('//android.widget.TextView[@resource-id="io.appium.android.apis:id/dateDisplay"]');
        const currentDate = date.getText();
        //Clicking on change date
        await $('~change the date').click();

        //Scrolling horizontally to the right
        await $('android=new UiScrollable(new UiSelector().scrollable(true)).setAsHorizontalList().scrollForward()');
        //Selecting the 10th date using index and selecting ok
        await $('//android.view.View[@index="9"]').click();
        await $('//android.widget.Button[@resource-id="android:id/button1"]').click();
        //Asserting the date has changed
        await expect(currentDate).not.toEqual(await date.getText());

    });
});