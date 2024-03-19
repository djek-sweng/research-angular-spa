namespace MyMDb.Shared.Exceptions.Filters;

public class InvalidParameterExceptionFilterAttribute : ExceptionFilterAttribute
{
    private const string ExceptionKey = "InvalidParameter";

    public override void OnException(ExceptionContext context)
    {
        if (context.Exception is InvalidParameterException exception)
        {
            context.ExceptionHandled = true;
            context.Result = new JsonResult(new ExceptionFilterContextResult
            {
                Key = ExceptionKey,
                Message = exception.Message
            })
            {
                StatusCode = (int)HttpStatusCode.BadRequest
            };
        }
    }
}
