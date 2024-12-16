# playwright-playground
```
    - name: Install Playwright Browsers
      run: npx playwright install --with-deps
        
    - name: Run Playwright tests
      run: npx playwright test -g "EEcircuit Next"
      
    - uses: actions/upload-artifact@v4
      if: always()
      with:
        name: playwright-report
        path: playwright-report/
        retention-days: 30
```
