namespace MyMDb.Shared.Exceptions.Filters;

public class UnauthorizedExceptionFilterAttribute : ExceptionFilterAttribute
{
    private const string ExceptionKey = "Unauthorized";

    public override void OnException(ExceptionContext context)
    {
        if (context.Exception is UnauthorizedException exception)
        {
            context.ExceptionHandled = true;
            context.Result = new JsonResult(new ExceptionFilterContextResult
            {
                Key = ExceptionKey,
                Message = exception.Message
            })
            {
                StatusCode = (int)HttpStatusCode.Unauthorized
            };
        }
    }
}
