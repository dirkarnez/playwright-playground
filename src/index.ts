import { chromium, devices } from 'playwright';
import { test, expect } from '@playwright/test';
// import assert from 'node:assert';
import fs from "node:fs";

(async () => {
  // Setup
  const browser = await chromium.launch({headless: false});
  const context = await browser.newContext();
  const page = await context.newPage();

  // The actual interesting bit
  // await context.route('**.jpg', route => route.abort());
  await page.goto('https://www38.polyu.edu.hk/ePublic/subject-search.jsf');
  console.log(await page.title());

  await page.locator("//input[@id='mainForm:subjCode']").fill("AAE", { force: true});
  await page.locator("//input[@id='mainForm:searchBtn']").click({force: true});


/*

 Array.from({length: 30}, (v, i) => i)
  .map(idx =>  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`Promise resolved for`)
    }, 2000)
  }))

*/



  // // await page.locator("//a[@id='mainForm:searchTable:0:subjCode']").click({force: true});
  // const promises = Array.from({length: 30}, (v, i) => i)
  // .map(idx => {
  //   return page.locator(`//a[@id='mainForm:searchTable:${idx}:subjCode']`).count()
  //   .then(count => {
  //     console.log("hello")
  //     if (count == 1) {
  //       return page.evaluate(`
  //         // search for "Subject Group Code"
  //         function getNearestAncestorByTagName(htmlElementNode, tagName) {
  //             let testNode = htmlElementNode;
  //             while (testNode != undefined && testNode.tagName != undefined && testNode.tagName.toLowerCase() != tagName) {
  //                 testNode = testNode.parentNode;
  //                 if (testNode == window.document) {
  //                     return undefined;
  //                 }
  //                 // debugger;
  //                 // if (htmlElementNode.tagName.toLowerCase() === tagName) {
  //                 //     return htmlElementNode;
  //                 // }
  //             }
  //             return testNode;
  //         }
          
  //         function titleCase(str) {
  //             return str
  //             .toLowerCase()
  //             .split(/\s+/)
  //             .map(a => ["I", "II", "III", "IV", "V"].some(roman => roman == a.toUpperCase()) ? a.toUpperCase() : a.charAt(0).toUpperCase() + a.slice(1))
  //             .join(String.fromCharCode(0x20))
  //             .trim()
  //         }
          
  //         const TD_SUBJECT_CODE_INDEX = 0;
  //         const TD_SUBJECT_TITLE_INDEX = 1;
  //         const TD_COMPONENT_CODE_INDEX = 3;
  //         const TD_SUBJECT_WEEKDAY_INDEX = 7;
  //         const TD_SUBJECT_START_TIME_INDEX = 8;
  //         const TD_SUBJECT_END_TIME_INDEX = 9;
  //         const TD_SUBJECT_VENUE_INDEX = 10;
          
  //         Array
  //         .from(document.getElementsByTagName('*'))
  //         .filter(a => a.textContent == "Subject Group Code" && a.children.length == 0)
  //         .reduce((prev, current) => {
  //             const nearestTable = getNearestAncestorByTagName(current, "table");
  //             return [
  //                 ...prev, 
  //                 ...Array
  //                     .from(nearestTable.tBodies)
  //                     .reduce((prevCourses, currentTBody) => {
  //                         return [
  //                             ...prevCourses,
  //                             ...Array
  //                             .from(currentTBody.children)
  //                             .reduce((prevLine, currentTR) => {
  //                                 return [
  //                                     ...prevLine,
  //                                     {
  //                                         "subject_code": currentTR.children[TD_SUBJECT_CODE_INDEX].textContent.trim(),
  //                                         "subject_title": titleCase(currentTR.children[TD_SUBJECT_TITLE_INDEX].textContent),
  //                                         "component_code": currentTR.children[TD_COMPONENT_CODE_INDEX].textContent.trim(),
  //                                         "weekday": currentTR.children[TD_SUBJECT_WEEKDAY_INDEX].textContent.trim(),
  //                                         "start_time": currentTR.children[TD_SUBJECT_START_TIME_INDEX].textContent.trim(),
  //                                         "end_time": currentTR.children[TD_SUBJECT_END_TIME_INDEX].textContent.trim(),
  //                                         "venue": currentTR.children[TD_SUBJECT_VENUE_INDEX].textContent.trim()
  //                                     }
  //                                 ]
  //                             }, [])
  //                         ]
  //                     }, []
  //                 )
  //             ];
  //         }, []);
  //       `);
  //     } else {
  //       return Promise.resolve()
  //     }
  //   })
  // });

  // for (const element of promises) {
  //   let result = await element;
  //   console.log(result)
  // }

  var lastCourseName: string | null = "";
  // var lastIdxlastPage: number = 0;
  `//*[@id="mainForm:j_id105_table"]/tbody/tr/td[4 + 0]`;
  var idx = 0;
  while (true) {
    const locator = `//a[@id='mainForm:searchTable:${idx}:subjCode']`;
    const count = await page.locator(locator).count();
    console.log(`locator ${locator}, count ${count}`)
    if (count == 1) {
      const courseName = await page.locator(locator).textContent();
      await page.locator(locator).click({force: true});
      const json = await page.evaluate(`
          // search for "Subject Group Code"
          function getNearestAncestorByTagName(htmlElementNode, tagName) {
              let testNode = htmlElementNode;
              while (testNode != undefined && testNode.tagName != undefined && testNode.tagName.toLowerCase() != tagName) {
                  testNode = testNode.parentNode;
                  if (testNode == window.document) {
                      return undefined;
                  }
                  // debugger;
                  // if (htmlElementNode.tagName.toLowerCase() === tagName) {
                  //     return htmlElementNode;
                  // }
              }
              return testNode;
          }
          
          function titleCase(str) {
              return str
              .toLowerCase()
              .split(/\\s+/)
              .map(a => ["I", "II", "III", "IV", "V"].some(roman => roman == a.toUpperCase()) ? a.toUpperCase() : a.charAt(0).toUpperCase() + a.slice(1))
              .join(String.fromCharCode(0x20))
              .trim()
          }
          
          const TD_SUBJECT_CODE_INDEX = 0;
          const TD_SUBJECT_TITLE_INDEX = 1;
          const TD_COMPONENT_CODE_INDEX = 3;
          const TD_SUBJECT_WEEKDAY_INDEX = 7;
          const TD_SUBJECT_START_TIME_INDEX = 8;
          const TD_SUBJECT_END_TIME_INDEX = 9;
          const TD_SUBJECT_VENUE_INDEX = 10;
          
          Array
          .from(document.getElementsByTagName('*'))
          .filter(a => a.textContent == "Subject Group Code" && a.children.length == 0)
          .reduce((prev, current) => {
              const nearestTable = getNearestAncestorByTagName(current, "table");
              return [
                  ...prev, 
                  ...Array
                      .from(nearestTable.tBodies)
                      .reduce((prevCourses, currentTBody) => {
                          return [
                              ...prevCourses,
                              ...Array
                              .from(currentTBody.children)
                              .reduce((prevLine, currentTR) => {
                                  return [
                                      ...prevLine,
                                      {
                                          "subject_code": currentTR.children[TD_SUBJECT_CODE_INDEX].textContent.trim(),
                                          "subject_title": titleCase(currentTR.children[TD_SUBJECT_TITLE_INDEX].textContent),
                                          "component_code": currentTR.children[TD_COMPONENT_CODE_INDEX].textContent.trim(),
                                          "weekday": currentTR.children[TD_SUBJECT_WEEKDAY_INDEX].textContent.trim(),
                                          "start_time": currentTR.children[TD_SUBJECT_START_TIME_INDEX].textContent.trim(),
                                          "end_time": currentTR.children[TD_SUBJECT_END_TIME_INDEX].textContent.trim(),
                                          "venue": currentTR.children[TD_SUBJECT_VENUE_INDEX].textContent.trim()
                                      }
                                  ]
                              }, [])
                          ]
                      }, []
                  )
              ];
          }, []);
        `);
        lastCourseName = courseName;
        console.log(`courseName ${courseName}`);
        await fs.promises.writeFile(`${courseName}.json`, `${JSON.stringify(json)}`, undefined);
        idx++;
        await page.goBack();
        console.log(`goBack`);
        // if (idx > 19) {
        //   await page.waitForTimeout(5000);
        // }
 
    } else {
      await page.locator("#mainForm\\:j_id105_table > tbody > tr > td:nth-child(8)").click({force: true});
      // await page.waitForTimeout(5000);
      const xp = `//a[@id='mainForm:searchTable:${idx + 1}:subjCode']`;

      console.log(`xp ${xp}`);
      await expect(page.locator(xp)).toBeEnabled();

      console.log(`new page`);
    }
  }
  //   
  //   
  //   
  // }


  // for await (const contents of promises) {
  //   console.log(contents)
  // }

  // console.log(`count !!! ${count}`)
  // if(await page.locator("//a[@id='mainForm:searchTable:0:subjCode']").count()>0) {

  // }

  // assert(await page.title() === 'Example Domain'); // 👎 not a Web First assertion

  // Teardown
  await context.close();
  await browser.close();
})();