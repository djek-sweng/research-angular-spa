namespace MyMDb.Shared.Exceptions.Filters;

public class NotFoundExceptionFilterAttribute : ExceptionFilterAttribute
{
    private const string ExceptionKey = "NotFound";

    public override void OnException(ExceptionContext context)
    {
        if (context.Exception is NotFoundException exception)
        {
            context.ExceptionHandled = true;
            context.Result = new JsonResult(new ExceptionFilterContextResult
            {
                Key = ExceptionKey,
                Message = exception.Message
            })
            {
                StatusCode = (int)HttpStatusCode.NotFound
            };
        }
    }
}
