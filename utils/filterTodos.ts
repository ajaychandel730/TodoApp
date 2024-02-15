import { Todo } from "@/lib/types";
import { FilterEnums } from "@/lib/enums";

export default function (todoLIst: Todo[], filter: FilterEnums): Todo[] {
  switch (filter) {
    case FilterEnums.ACTIVE: {
      return todoLIst.filter((todo) => todo.isCompleted == false);
    }

    case FilterEnums.COMPLETED: {
      return todoLIst.filter((todo) => todo.isCompleted == true);
    }

    case FilterEnums.ALL: {
      return todoLIst;
    }

    default: {
      return [];
    }
  }
}
