如何用js+css实现，每次点击button，都让div旋转一周？

```
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <title>Document</title>
        <style>
            div {
                width: 20px;
                height: 20px;
                background-color: red;
                margin: 20px;
                transition: transform 1s;
            }
        </style>
    </head>
    <body>
        <div></div>
        <button>Click to rotate red block</button>
    </body>
    <script>
        const button = document.querySelector('button');
        const div = document.querySelector('div');
        let deg = 360;
        button.addEventListener('click', () => {
            div.style.transform = `rotate(${deg}deg)`;
            deg += 360;
        });
    </script>
</html>
```

说明：如果不用 `deg += 360;` ,那么再第一次点击旋转之后，后续点击就不会再旋转了，所以需要来累加旋转的角度，达到每次都旋转