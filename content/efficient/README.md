## post-merge

在多人协作的过程中，我们并不知道别人是否有在 package.json 中更改包管理。如果你需要在 `git pull` 的时候自动执行 `npm install` 的话，就可以使用这段代码。

首先在命令行中执行 `chmod +x post-merge`，让 post-merge 变成可执行文件，然后将这个文件放入 .git/hooks 中，这样下次在执行 `git pull` 的时候就会自动安装。
