namespace MyMDb.Shared.Exceptions.Filters;

public class InvalidResultExceptionFilterAttribute : ExceptionFilterAttribute
{
    private const string ExceptionKey = "InvalidResult";

    public override void OnException(ExceptionContext context)
    {
        if (context.Exception is InvalidResultException exception)
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
