#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <sys/types.h>
#include <unistd.h>
char cmd0[4096],cmd1[4096],cmd2[4096];
char tmp0[4096];
int main(int argc,char **argv){
    if (argc != 6){
        printf("Usage: openlpl <http|https|ipport> <port> <file> <remote> <git-branch>\n");
        printf("Example: openlpl https 80 80.txt origin master\n");
        return 0;
    }
    char *mode = argv[1];
    char *port = argv[2];
    char *dir = ".";
    char *file = argv[3];
    char *rem = argv[4];
    char *br = argv[5];
    sprintf(tmp0,"cd %s",dir);
    system(tmp0);
    sprintf(cmd0,"ssh -R 80:localhost:%s sh@sh3.neiwangyun.net > .%s.tmp 2> /dev/null",port,file);
    sprintf(cmd1,"cat .%s.tmp | grep %s | grep -v tunnel | awk '{print $3}' > %s",file,mode,file);
    sprintf(cmd2,"git add . && git commit -m \"changed domain\" && git push %s %s",rem,br);
    while (1){
        if (fork() == 0){
            system(cmd0);
            return 0;
        }
        sleep(5);
        system(cmd1);
        system(cmd2);
        wait(NULL);
    }
    return 0;
}
