const curry = fn =>
    (arg, args = [arg]) =>
    (!fn.length || args.length === fn.length ? 
    fn(...args) : 
    newArg => curry(fn)(newArg, [...args, newArg]));

    