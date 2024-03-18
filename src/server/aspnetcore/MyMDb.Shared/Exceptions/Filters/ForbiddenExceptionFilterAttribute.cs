namespace MyMDb.Shared.Exceptions.Filters;

public class ForbiddenExceptionFilterAttribute : ExceptionFilterAttribute
{
    private const string ExceptionKey = "Forbidden";

    public override void OnException(ExceptionContext context)
    {
        if (context.Exception is ForbiddenException exception)
        {
            context.ExceptionHandled = true;
            context.Result = new JsonResult(new ExceptionFilterContextResult
            {
                Key = ExceptionKey,
                Message = exception.Message
            })
            {
                StatusCode = (int)HttpStatusCode.Forbidden
            };
        }
    }
}
