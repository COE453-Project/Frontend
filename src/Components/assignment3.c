#include <stdio.h>
#include <stdlib.h>
#include <time.h>

#define PAGE_RANGE 10
#define REFERENCE_STRING_LENGTH 20

void generate_reference_string(int *reference_string) {
    srand(time(NULL));
    for (int i = 0; i < REFERENCE_STRING_LENGTH; i++) {
        reference_string[i] = rand() % PAGE_RANGE;
    }
}

int fifo(int *reference_string, int num_frames) {
    int frames[num_frames];
    int page_faults = 0, index = 0;
    
    for (int i = 0; i < num_frames; i++) {
        frames[i] = -1;
    }

    for (int i = 0; i < REFERENCE_STRING_LENGTH; i++) {
        int found = 0;
        for (int j = 0; j < num_frames; j++) {
            if (frames[j] == reference_string[i]) {
                found = 1;
                break;
            }
        }
        if (!found) {
            frames[index] = reference_string[i];
            index = (index + 1) % num_frames;
            page_faults++;
        }
    }
    return page_faults;
}

int lru(int *reference_string, int num_frames) {
    int frames[num_frames];
    int page_faults = 0;
    int used[num_frames];
    
    for (int i = 0; i < num_frames; i++) {
        frames[i] = -1;
        used[i] = -1;
    }

    for (int i = 0; i < REFERENCE_STRING_LENGTH; i++) {
        int found = 0;
        for (int j = 0; j < num_frames; j++) {
            if (frames[j] == reference_string[i]) {
                found = 1;
                used[j] = i;
                break;
            }
        }
        if (!found) {
            int lru_index = 0;
            for (int j = 1; j < num_frames; j++) {
                if (used[j] < used[lru_index]) {
                    lru_index = j;
                }
            }
            frames[lru_index] = reference_string[i];
            used[lru_index] = i;
            page_faults++;
        }
    }
    return page_faults;
}

int opt(int *reference_string, int num_frames) {
    int frames[num_frames];
    int page_faults = 0;
    
    for (int i = 0; i < num_frames; i++) {
        frames[i] = -1;
    }

    for (int i = 0; i < REFERENCE_STRING_LENGTH; i++) {
        int found = 0;
        for (int j = 0; j < num_frames; j++) {
            if (frames[j] == reference_string[i]) {
                found = 1;
                break;
            }
        }
        if (!found) {
            int opt_index = -1;
            int farthest = i;
            for (int j = 0; j < num_frames; j++) {
                int k;
                for (k = i + 1; k < REFERENCE_STRING_LENGTH; k++) {
                    if (frames[j] == reference_string[k]) {
                        if (k > farthest) {
                            farthest = k;
                            opt_index = j;
                        }
                        break;
                    }
                }
                if (k == REFERENCE_STRING_LENGTH) {
                    opt_index = j;
                    break;
                }
            }
            if (opt_index == -1) {
                opt_index = 0;
            }
            frames[opt_index] = reference_string[i];
            page_faults++;
        }
    }
    return page_faults;
}

int main(int argc, char *argv[]) {
    if (argc != 2) {
        printf("Usage: %s <number_of_frames>\n", argv[0]);
        return 1;
    }
    
    int num_frames = atoi(argv[1]);
    if (num_frames <= 0) {
        printf("Number of frames must be greater than 0\n");
        return 1;
    }

    int reference_string[REFERENCE_STRING_LENGTH];
    generate_reference_string(reference_string);

    printf("Page reference string: ");
    for (int i = 0; i < REFERENCE_STRING_LENGTH; i++) {
        printf("%d ", reference_string[i]);
    }
    printf("\n");

    int fifo_faults = fifo(reference_string, num_frames);
    int lru_faults = lru(reference_string, num_frames);
    int opt_faults = opt(reference_string, num_frames);

    printf("FIFO page faults: %d\n", fifo_faults);
    printf("LRU page faults: %d\n", lru_faults);
    printf("OPT page faults: %d\n", opt_faults);

    return 0;
}
